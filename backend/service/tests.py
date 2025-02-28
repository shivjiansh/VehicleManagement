from rest_framework.test import APITestCase
from rest_framework import status
from .models import Component, Vehicle, Issue, Payment
from django.contrib.auth.models import User
from decimal import Decimal
from rest_framework.test import APIClient

class IssueViewSetTestCase(APITestCase):
    
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.login(username='testuser', password='password')
        
        # Create components
        self.component1 = Component.objects.create(name="Component 1", purchase_price=Decimal('100.00'), repair_price=Decimal('50.00'))
        self.component2 = Component.objects.create(name="Component 2", purchase_price=Decimal('200.00'), repair_price=Decimal('80.00'))

        # Create an issue
        self.issue = Issue.objects.create(
            description="Test Issue",
            labor_cost=Decimal('150.00'),
            use_new_components=True
        )
        self.issue.components.add(self.component1, self.component2)
    
    def test_calculate_total(self):
        # Test the total calculation for an issue
        url = f'/issues/{self.issue.id}/calculate_total/'
        response = self.client.get(url)
        
        # Calculate expected total: purchase_price of components + labor cost
        expected_total = (self.component1.purchase_price + self.component2.purchase_price) + self.issue.labor_cost
        expected_total = round(expected_total, 2)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total'], expected_total)

    def test_calculate_total_no_labor_cost(self):
        # Test total calculation when there's no labor cost
        self.issue.labor_cost = None
        self.issue.save()
        
        url = f'/issues/{self.issue.id}/calculate_total/'
        response = self.client.get(url)
        
        # Calculate expected total: sum of component prices
        expected_total = (self.component1.purchase_price + self.component2.purchase_price)
        expected_total = round(expected_total, 2)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total'], expected_total)

    def test_pay_issue(self):
        # Test the payment action for an issue
        url = f'/issues/{self.issue.id}/pay/'
        response = self.client.post(url)
        
        self.issue.refresh_from_db()
        
        # Verify that the payment status is True and the payment is created
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.issue.payment_status)
        self.assertEqual(Payment.objects.count(), 1)

class PaymentViewSetTestCase(APITestCase):
    
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.login(username='testuser', password='password')
        
        # Create payments
        self.payment1 = Payment.objects.create(issue=self.create_issue(), amount=Decimal('100.00'), payment_date='2025-02-01')
        self.payment2 = Payment.objects.create(issue=self.create_issue(), amount=Decimal('200.00'), payment_date='2025-02-02')
        self.payment3 = Payment.objects.create(issue=self.create_issue(), amount=Decimal('150.00'), payment_date='2025-02-01')
    
    def create_issue(self):
        # Helper method to create an issue
        issue = Issue.objects.create(description="Test Issue", labor_cost=Decimal('50.00'))
        return issue

    def test_revenue_daily(self):
        # Test revenue aggregation by day
        url = '/payments/revenue/?timeFrame=daily'
        response = self.client.get(url)
        
        # Check if the total revenue is correct
        expected_revenue = [
            {'period': '2025-02-01', 'total_revenue': '250.00'},
            {'period': '2025-02-02', 'total_revenue': '200.00'}
        ]
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_revenue)

    def test_revenue_monthly(self):
        # Test revenue aggregation by month
        url = '/payments/revenue/?timeFrame=monthly'
        response = self.client.get(url)
        
        # Check if the total revenue is correct
        expected_revenue = [
            {'period': '2025-02-01', 'total_revenue': '450.00'}
        ]
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_revenue)

    def test_revenue_yearly(self):
        # Test revenue aggregation by year
        url = '/payments/revenue/?timeFrame=yearly'
        response = self.client.get(url)
        
        # Check if the total revenue is correct
        expected_revenue = [
            {'period': '2025-01-01', 'total_revenue': '450.00'}
        ]
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_revenue)
    
class ComponentModelTestCase(TestCase):
    
    def setUp(self):
        # Create a component instance
        self.component = Component.objects.create(
            name="Engine",
            repair_price=Decimal('150.00'),
            purchase_price=Decimal('100.00'),
            stock=10
        )
    
    def test_component_creation(self):
        # Ensure the component is created correctly
        self.assertEqual(self.component.name, "Engine")
        self.assertEqual(self.component.repair_price, Decimal('150.00'))
        self.assertEqual(self.component.purchase_price, Decimal('100.00'))
        self.assertEqual(self.component.stock, 10)

    def test_component_str_method(self):
        # Ensure the string representation of the component is correct
        self.assertEqual(str(self.component), "Engine")

class VehicleModelTestCase(TestCase):

    def setUp(self):
        # Create a vehicle instance
        self.vehicle = Vehicle.objects.create(
            VIN="1HGBH41JXMN109186",
            make="Honda",
            model="Civic",
            year=2020,
            issue_description="Engine failure"
        )
    
    def test_vehicle_creation(self):
        # Ensure the vehicle is created correctly
        self.assertEqual(self.vehicle.VIN, "1HGBH41JXMN109186")
        self.assertEqual(self.vehicle.make, "Honda")
        self.assertEqual(self.vehicle.model, "Civic")
        self.assertEqual(self.vehicle.year, 2020)
        self.assertEqual(self.vehicle.issue_description, "Engine failure")

    def test_vehicle_str_method(self):
        # Ensure the string representation of the vehicle is correct
        self.assertEqual(str(self.vehicle), "Honda Civic (2020)")

class IssueModelTestCase(TestCase):

    def setUp(self):
        # Create a vehicle instance
        self.vehicle = Vehicle.objects.create(
            VIN="1HGBH41JXMN109186",
            make="Honda",
            model="Civic",
            year=2020,
            issue_description="Engine failure"
        )
        
        # Create component instances
        self.component1 = Component.objects.create(
            name="Engine",
            repair_price=Decimal('150.00'),
            purchase_price=Decimal('100.00'),
            stock=10
        )
        self.component2 = Component.objects.create(
            name="Transmission",
            repair_price=Decimal('120.00'),
            purchase_price=Decimal('80.00'),
            stock=5
        )
        
        # Create an issue instance
        self.issue = Issue.objects.create(
            vehicle=self.vehicle,
            labor_cost=Decimal('200.00'),
            total_price=Decimal('0.00'),
            payment_status=False,
            use_new_components=True
        )
        self.issue.components.add(self.component1, self.component2)
    
    def test_issue_creation(self):
        # Ensure the issue is created correctly
        self.assertEqual(self.issue.vehicle, self.vehicle)
        self.assertEqual(self.issue.labor_cost, Decimal('200.00'))
        self.assertEqual(self.issue.payment_status, False)
        self.assertEqual(self.issue.use_new_components, True)

    def test_issue_total_price_calculation(self):
        # Calculate total price: sum of component prices + labor cost
        component_total = (self.component1.purchase_price + self.component2.purchase_price)
        total_price = component_total + self.issue.labor_cost
        self.assertEqual(total_price, Decimal('450.00'))  # 100 + 80 + 200

    def test_issue_str_method(self):
        # Ensure the string representation of the issue is correct
        self.assertEqual(str(self.issue), f"Issue for {self.vehicle} with components {', '.join([str(comp) for comp in self.issue.components.all()])}")

class PaymentModelTestCase(TestCase):

    def setUp(self):
        # Create a vehicle instance
        self.vehicle = Vehicle.objects.create(
            VIN="1HGBH41JXMN109186",
            make="Honda",
            model="Civic",
            year=2020,
            issue_description="Engine failure"
        )
        
        # Create an issue instance
        self.issue = Issue.objects.create(
            vehicle=self.vehicle,
            labor_cost=Decimal('200.00'),
            total_price=Decimal('0.00'),
            payment_status=False,
            use_new_components=True
        )
        
        # Create a payment instance
        self.payment = Payment.objects.create(
            issue=self.issue,
            amount=Decimal('450.00')
        )
    
    def test_payment_creation(self):
        # Ensure the payment is created correctly
        self.assertEqual(self.payment.issue, self.issue)
        self.assertEqual(self.payment.amount, Decimal('450.00'))

    def test_payment_str_method(self):
        # Ensure the string representation of the payment is correct
        self.assertEqual(str(self.payment), f"Payment #{self.payment.id}")


from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, DateTimeField
from django.db.models.functions import TruncMonth, TruncYear, TruncDay
from rest_framework.decorators import action
from .models import Component, Vehicle, Issue, Payment
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, PaymentSerializer
from decimal import Decimal

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    @action(detail=True, methods=['get'])
    def calculate_total(self, request, pk=None):
        try:
            issue = self.get_object()
            components = issue.components.all()

           
            component_total = sum(
                Decimal(comp.purchase_price) if issue.use_new_components else Decimal(comp.repair_price)
                for comp in components
            )

           
            labor_cost = Decimal(issue.labor_cost) if issue.labor_cost is not None else Decimal(0.0)

           
            total = component_total + labor_cost
            
           
            return Response({'total': round(total, 2)})

        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        issue = self.get_object()
        payment_amount = issue.total_price
        
        Payment.objects.create(issue=issue, amount=payment_amount)
        issue.payment_status = True
        issue.save()
        
        return Response({'status': 'Payment successful'}, status=status.HTTP_200_OK)
 


    def perform_create(self, serializer):

        instance = serializer.save()
        

        component_total = sum(
            Decimal(comp.purchase_price) if instance.use_new_components else Decimal(comp.repair_price)
            for comp in instance.components.all()
        )
        labor_cost = Decimal(instance.labor_cost) if instance.labor_cost else Decimal(0.0)
        
  
        total_price = component_total + labor_cost
        

        instance.total_price = total_price
        instance.save() 

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    @action(detail=False, methods=['get'])
    def revenue(self, request):
        
        time_frame = request.query_params.get('timeFrame', 'daily')
        
       
        trunc_function = {
            'daily': TruncDay,
            'monthly': TruncMonth,
            'yearly': TruncYear
        }.get(time_frame, TruncDay) 

      
        revenue_data = Payment.objects.annotate(
            period=trunc_function('payment_date')
        ).values('period').annotate(
            total_revenue=Sum('amount')
        ).order_by('period')

      
        return Response(revenue_data)
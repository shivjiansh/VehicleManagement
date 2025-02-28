from rest_framework import serializers
from .models import Component, Vehicle, Issue, Payment

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    components = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Component.objects.all()
    )

    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ('total_price',)

    def create(self, validated_data):
       
        components = validated_data.pop('components')
       
        instance = super().create(validated_data)
       
        instance.components.set(components)
        
        component_prices = sum(c.repair_price for c in components)
        instance.total_price = component_prices + instance.labor_cost
        
        instance.save()
        return instance

    def update(self, instance, validated_data):
        components = validated_data.pop('components', None)
        
        instance = super().update(instance, validated_data)
        if components is not None:
            instance.components.set(components)
       
        component_prices = sum(c.repair_price for c in instance.components.all())
        instance.total_price = component_prices + instance.labor_cost
        instance.save()
        return instance

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
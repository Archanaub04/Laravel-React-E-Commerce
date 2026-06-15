<x-mail::message>
<h1 style="text-align: center; font-size: 24px;">Payment was Completed Successfully!</h1>

@foreach ($orders as $order)
<x-mail::table>
<table>
<tbody>
<tr>
<td>Seller</td>
<td>
<a href="{{ url('/') }}">{{ $order->vendorUser->vendor->store_name }}</a>
</td>
</tr>
<tr>
<td>Order #</td>
<td>{{ $order->id }}</td>
</tr>
<tr>
<td>Items</td>
<td>{{ $order->orderItems->count() }}</td>
</tr>
<tr>
<td>Total</td>
<td>{{ Number::currency($order->total_price) }}</td>
</tr>
</tbody>
</table>
</x-mail::table>

{{-- ✅ Include reusable order item table --}}
@include('emails.components.order-items-table', ['order' => $order])

<x-mail::button :url="$order->id">View Order Details</x-mail::button>
@endforeach

<x-mail::subcopy>
If you have any questions about this order, feel free to contact our support team.

You may submit a request to return via E-CommerceCore2 App. A return request must be made within 30 days of receiving your order.
</x-mail::subcopy>

<x-mail::panel>
Find out more about our return policy on our website.
</x-mail::panel>

Thanks,<br />
{{ config('app.name') }}
</x-mail::message>

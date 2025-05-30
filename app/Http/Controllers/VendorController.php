<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Enum\VendorStatusEnum;
use App\Http\Resources\ProductListResource;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function profile(Vendor $vendor, Request $request)
    {
        $keyword = $request->query('keyword');

        $products = Product::query()
            ->where('created_by', $vendor->user_id)
            ->forWebsite()
            ->searchKeyword($keyword)
            ->paginate();

        return Inertia::render('Vendor/Profile', [
            'vendor' => $vendor,
            'products' => [
                'data' => ProductListResource::collection($products)->resolve(),
                'links' => $products->toArray()['links'],
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                ],
            ],
        ]);
    }
    public function store(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'store_name'    => [
                'required',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('vendors', 'store_name')->ignore($user->id, 'user_id')
            ],
            'store_address' => 'nullable',
        ], [
            'store_name.regex' => 'Store Name must only contain lowercase alphanumeric characters and numbers.'
        ]);

        $vendor = $user->vendor ?: new Vendor();
        $vendor->user_id = $user->id;
        $vendor->status = VendorStatusEnum::Approved->value;
        $vendor->store_name = $request->store_name;
        $vendor->store_address = $request->store_address;
        $vendor->save();

        $user->assignRole(RolesEnum::Vendor);
    }
}

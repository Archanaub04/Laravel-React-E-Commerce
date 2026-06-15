<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class ProductVariations extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';

    protected static ?string $title = 'Variations';

    public function form(Form $form): Form
    {
        $types = $this->record->variationTypes;
        $fields = [];

        foreach ($types as $type) {

            $fields[] = TextInput::make('variation_type_' . ($type->id) . '.id')
                ->hidden();

            $fields[] = TextInput::make('variation_type_' . ($type->id) . '.name')
                ->label($type->name)
                ->disabled();
        }

        return $form
            ->schema([
                Repeater::make('variations')
                    ->label(false)
                    ->collapsible()
                    ->addable(false)
                    ->defaultItems(1)
                    ->schema([

                        // Add a hidden field to store the variation ID
                        Hidden::make('id'),

                        Section::make()
                            ->schema($fields)
                            ->columns(3),

                        TextInput::make('quantity')
                            ->label('Quantity')
                            ->numeric()
                            ->required(),

                        TextInput::make('price')
                            ->label('Price')
                            ->numeric()
                            ->required(),
                    ])
                    ->columns(2)
                    ->columnSpan(2)

            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    // built in function to change the get data functionality - to mutate the get data functionality
    // mutate the form data before filling

    // here it change the product variation data from laravel collection format data to array
    // and merge the new variant combination with the existing combinations
    protected function mutateFormDataBeforeFill(array $data): array
    {
        // $this->record means it takes the data from the database - remember in route also we use record variable there

        $variations = $this->record->variations->toArray();
        $data['variations'] = $this->mergeCartesianWithExisting($this->record->variationTypes, $variations);
        return $data;
    }

    // generate product variation combinations

    private function mergeCartesianWithExisting($variationTypes, $existingVariations)
    {
        $defaultQuantity = $this->record->quantity;
        $defaultPrice = $this->record->price;

        // generate cartesian product - product variant combinations
        $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice);

        /* ------------ UPDATE COMBINATION quantity & price WITH EXISTING COMBINATION ------------- */

        $mergedResult = [];

        foreach ($cartesianProduct as $product) {
            // generate option IDs from the current variant combinations as an array (associative)

            // below is the format of the each combination will have from database

            /**
             * [
             *  {
             *      "variation_type_1": {
             *          "id": 1,
             *          "name": "Black",
             *          "type": "Color"
             *       },
             *      "variation_type_2": {
             *          "id": 4,
             *          "name": "small",
             *          "type": "Size"
             *       },
             *      "quantity": 10,
             *      "price": 19
             *      "id" : 1 // if existing combination
             *  },
             *  --------------
             * ]
             */

            /* * convert this to collection
               * and gets ids as array like [1,4] means [color - black, size - small] */

            $optionIds = collect($product)
                ->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))
                ->map(fn($option) => $option['id'])
                ->values()
                ->toArray();

            /* * find matching entry in the existing variant combinations using above $optionIds
            * means new entry combination if already present in the existing combination - extract that */

            $match = array_filter($existingVariations, function ($existingOption) use ($optionIds) {
                return $existingOption['variation_type_option_ids'] === $optionIds;
            });

            /* * if match found, override quantity and price of that with the same one in the database
               * means not taking new qunatity and price and taking the database old one */

            if (!empty($match)) {
                // existing variant combination

                $existingEntry = reset($match); // taking the first element of the matching entry array

                // update quantity and price from existing entry in the database instead of taking the new values from the form data
                $product['id'] = $existingEntry['id'];
                $product['quantity'] = $existingEntry['quantity'];
                $product['price'] = $existingEntry['price'];
            } else {
                // new variant combiantion
                // update the product's default main quantity & price from products table
                // For new combinations, ensure ID is explicitly null
                $product['id'] = null;
                $product['quantity'] = $defaultQuantity;
                $product['price'] = $defaultPrice;
            }

            $mergedResult[] = $product;
        }
        /* -------------------------------------------------------------------------------------------- */

        return $mergedResult;
    }

    // generate cartesian product of variant combinations
    private function cartesianProduct($variationTypes, $defaultQuantity = null, $defaultPrice = null): array
    {
        $result = [[]];

        // loop each varation type - color, size
        foreach ($variationTypes as $index => $variationType) {
            $temp = [];

            // loops variant's option values = like black, blue, purple
            foreach ($variationType->options as $option) {

                // add the current option to each existing combinations - cartesian product like
                // already color only combination, then second time will add size options to it

                foreach ($result as $combination) {
                    $newCombination = $combination + [
                        'variation_type_' . ($variationType->id) => [
                            'id'    => $option->id,
                            'name'  => $option->name,
                            'label' => $variationType->name
                        ],
                    ];

                    $temp[] = $newCombination;

                    /*
                    * $temp = [
                        [
                            'variation_type_1' => [
                                'id' => 1,
                                'name' => 'black',
                                'label' => 'color
                            ],
                            'variation_type_2' => [
                                'id' => 4,
                                'name' => 'small',
                                'label' => 'size'
                            ]
                        ],
                        ---------------------------
                      ]
                    */
                }
            }
            $result = $temp; // update (push to result) the result with the data in temp
        }

        // add default quantity and price to all the combinations created in result

        foreach ($result as &$combination) {
            if (count($combination) === count($variationTypes)) {
                $combination['quantity'] = $defaultQuantity;
                $combination['price'] = $defaultPrice;
            }
        }

        return $result;
    }

    // built in function to save functionality - to mutate the save functionality
    protected function mutateFormDataBeforeSave(array $data): array
    {
        $formattedData = [];

        /*
             0 => array:5 [
                "variation_type_9" => array:2 [▼
                    "id" => 25
                    "label" => "Color"
                ]
                "variation_type_10" => array:2 [▼
                    "id" => 28
                    "label" => "Size"
                ]
                "quantity" => 3
                "price" => "25.0000"
                "id" => 227
                ]
        */

        // loop through each variation to restructure it
        foreach ($data['variations'] as $option) {
            $variationTypeOptionIds = [];

            // making the array [9,10] format
            foreach ($this->record->variationTypes as $id => $variationType) {
                $variationTypeOptionIds[] = $option['variation_type_' . $variationType->id]['id'];
            }

            $quantity = $option['quantity'];
            $price = $option['price'];

            // prepare the data structure for table
            // left side is the column name in table
            // Include the variation ID (can be null for new variations)
            $formattedData[] = [
                'id' => isset($option['id']) && !empty($option['id']) ? $option['id'] : null,
                'variation_type_option_ids' => $variationTypeOptionIds,
                'quantity' => $quantity,
                'price' => $price
            ];
        }
        $data['variations'] = $formattedData;

        return $data;
    }

    // built in method to make its format correct to save in database

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $variations = $data['variations'];
        unset($data['variations']); // removes the variations key from the $data array before updating the main product.

        // Update the main product record
        $record->update($data);

        // Track variation IDs that are still in use
        $activeVariationIds = [];

        foreach ($variations as $variation) {
            $variationData = [
                'variation_type_option_ids' => $variation['variation_type_option_ids'],
                'quantity' => $variation['quantity'],
                'price' => $variation['price'],
                'product_id' => $record->id,
            ];

            if (isset($variation['id']) && !empty($variation['id'])) {
                $existingVariation = $record->variations()->find($variation['id']);
                if ($existingVariation) {
                    $existingVariation->update($variationData);
                    $activeVariationIds[] = $existingVariation->id;
                } else {
                    // If ID exists but record not found, create new
                    $new = $record->variations()->create($variationData);
                    $activeVariationIds[] = $new->id;
                }
            } else {
                $new = $record->variations()->create($variationData);
                $activeVariationIds[] = $new->id;
            }
        }

        // Delete variations that are NOT in the updated form data
        $record->variations()
            ->whereNotIn('id', $activeVariationIds)
            ->delete();

        // Set the form data with updated IDs to make it available for next submission
        $this->form->fill([
            'variations' => $record->variations->map(function ($variation) {
                $data = [
                    'id' => $variation->id,
                    'quantity' => $variation->quantity,
                    'price' => $variation->price,
                ];

                // Add variation_type fields based on variation_type_option_ids
                $variationTypes = $this->record->variationTypes;
                foreach ($variationTypes as $index => $type) {
                    $optionId = $variation->variation_type_option_ids[$index] ?? null;
                    if ($optionId) {
                        $option = $type->options()->find($optionId);
                        if ($option) {
                            $data['variation_type_' . $type->id] = [
                                'id' => $option->id,
                                'name' => $option->name,
                                'label' => $type->name,
                            ];
                        }
                    }
                }

                return $data;
            })->toArray(),
        ]);

        return $record;
    }
}

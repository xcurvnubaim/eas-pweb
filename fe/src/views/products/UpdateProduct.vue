
<template>
    <form @submit.prevent="updateProduct" class="mx-5 mt-3">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-">Add Product</h2>

                <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="text" name="Name" id="Name"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Gula merah" v-model="productName" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="mt-5">
                    <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span class="text-gray-500 sm:text-sm">Rp</span>
                        </div>
                        <input type="text" name="price" id="price"
                            class="block rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0.00" v-model="productPrice" />
                    </div>
                </div>


            </div>

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
    setup() {
        const router = useRouter();
        const prodID = router.currentRoute.value.params.id
        const productName = ref(null);
        const productPrice = ref(null);

        const getProductDetail = async () => {
            const response = await axios.get(import.meta.env.VITE_API_URL + '/api/products/' + prodID, {
                withCredentials: true,
            });
            productName.value = response.data.name;
            productPrice.value = response.data.price;
        }

        const updateProduct = async () => {
            const response = await axios.patch(import.meta.env.VITE_API_URL + '/api/products/' + prodID, {
                name: productName.value,
                price: productPrice.value
            }, {
                withCredentials: true,
            });
            console.log(response.data);
            router.push('/products/me');
        }

        getProductDetail()

        return {
            productName,
            productPrice,
            updateProduct
        }
    }
}
</script>
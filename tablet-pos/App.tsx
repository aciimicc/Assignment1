import "./global.css";

import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { categories, products, type Product } from "./src/data/products";
import {
  useCartStore,
  type CartItem as CartItemType,
} from "./src/store/cartStore";
import {
  Plus,
  Minus,
  ChevronLeft,
  ChevronDown,
  Grid3X3,
} from "lucide-react-native";

const money = (value: number): string => value.toFixed(2);



type CategoryFilterProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedId,
  onSelect,
}) => (
  <View className="mt-3 mb-3">

    <View className="w-full bg-neutral-800 rounded-xl border border-neutral-700 px-3 py-2 flex-row">
      {categories.map((category) => {
        const isActive = selectedId === category.id;

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            className={`flex-row items-center mr-4 ${
              isActive
                ? "bg-neutral-900 rounded-full px-3 py-1" 
                : "px-3 py-1"
            }`}
          >
           
            <View className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />

           
            <Text
              className={`text-[12px] font-semibold ${
                isActive ? "text-sky-400" : "text-neutral-200"
              }`}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);





type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const isDisabled = !product.inStock;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`bg-neutral-900 rounded-3xl p-3 border ${
        isDisabled ? "border-neutral-800 opacity-60" : "border-neutral-700"
      }`}
      style={{ minHeight: 160 }}
    >

      <View className="rounded-2xl overflow-hidden bg-neutral-800 mb-3">
        <Image
          source={{ uri: product.image }}
          className="w-full h-24"
          resizeMode="cover"
        />
      </View>

      <Text
        className="text-neutral-50 font-semibold text-xs mb-1"
        numberOfLines={2}
      >
        {product.name}
      </Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-neutral-50 font-semibold text-xs">
          ${money(product.price)}
        </Text>
        <Text
          className={`text-[11px] ${
            product.inStock ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </Text>
      </View>
    </Pressable>
  );
};


const CartRow: React.FC<{ item: CartItemType }> = ({ item }) => (
  <View className="mt-2">

    <View className="flex-row items-center mb-1">
      <View className="px-2 py-0.5 rounded-full bg-neutral-800 mr-2">
        <Text className="text-[10px] text-neutral-200">Course 1</Text>
      </View>

      <View className="flex-row flex-1 justify-end">
        <View className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500 mr-1">
          <Text className="text-[10px] text-rose-400">Unpaid</Text>
        </View>
        <View className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500 mr-1">
          <Text className="text-[10px] text-sky-400">Building</Text>
        </View>
        <View className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500">
          <Text className="text-[10px] text-purple-300">Opened</Text>
        </View>
      </View>
    </View>

    <View className="rounded-xl bg-neutral-800 border border-neutral-600 px-3 py-2 flex-row items-center justify-between">
      <View className="flex-row itemstype ProductCard-center flex-1">
        <Text
          className="text-neutral-50 text-xs font-semibold"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-neutral-300 text-[11px] ml-2">
          × {item.quantity}
        </Text>
      </View>
      <Text className="text-neutral-50 text-xs font-semibold ml-2">
        ${money(item.price * item.quantity)}
      </Text>
    </View>

    {item.note ? (
      <Text className="text-neutral-400 text-[11px] mt-1" numberOfLines={1}>
        {item.note}
      </Text>
    ) : null}
  </View>
);



type ItemDetailsPanelProps = {
  product: Product;
  onBack: () => void;
  onDone: (quantity: number, note?: string) => void;
};

const ItemDetailsPanel: React.FC<ItemDetailsPanelProps> = ({
  product,
  onBack,
  onDone,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setQuantity(1);
    setNote("");
  }, [product.id]);

  const handleDecrease = () =>
    setQuantity((current) => (current > 1 ? current - 1 : 1));
  const handleIncrease = () => setQuantity((current) => current + 1);

  const handleDone = () => {
    onDone(quantity, note.trim() || undefined);
  };

  return (
    <View className="flex-1 pt-3">
 
      <View className="mb-3">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-neutral-100 text-sm font-semibold">
            Order Line
          </Text>
          <View className="flex-row items-center gap-2">
            <Pressable  onPress={onBack}  className="px-3 py-1.5 bg-red-500 rounded-md">
              <Text className="text-neutral-50 text-xs font-semibold">
                X
              </Text>
            </Pressable>
            <Pressable
              onPress={handleDone}
              className="px-3 py-1.5 bg-emerald-500 rounded-md"
            >
              <Text className="text-neutral-50 text-xs font-semibold">
                Done ✓
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="h-px bg-neutral-800" />
      </View>

      {/* Back link */}
      <Pressable onPress={onBack} className="flex-row items-center mb-3">
        <ChevronLeft size={16} color="#e5e7eb" />
        <Text className="text-neutral-100 text-xs font-medium ml-1">
          Back to Menu
        </Text>
      </Pressable>


      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: product.image }}
          className="w-14 h-14 rounded-full mr-3"
          resizeMode="cover"
        />
        <View>
          <Text className="text-neutral-50 text-lg font-semibold">
            {product.name}
          </Text>
          <Text className="text-sky-400 text-sm mt-1">
            Base ${money(product.price)}
          </Text>
        </View>
      </View>


       <View className="mb-6">
        <Text className="text-neutral-100 font-medium mb-3">
          Quantity
        </Text>

        <View className="flex-row items-center justify-center gap-6">
   
          <Pressable
            onPress={handleDecrease}
            className="w-10 h-10 rounded-full border border-neutral-600 bg-neutral-900 items-center justify-center"
          >
            <Minus size={18} color="#e5e7eb" />
          </Pressable>

    <View className="w-10 h-9 rounded-md bg-neutral-900 border border-neutral-700 items-center justify-center">
            <Text className="text-neutral-100 text-base font-semibold">
              {quantity}
            </Text>
          </View>

         
          <Pressable
            onPress={handleIncrease}
            className="w-10 h-10 rounded-full bg-violet-500 items-center justify-center"
          >
            <Plus size={18} color="#f9fafb" />
          </Pressable>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-neutral-100 font-medium mb-2 ">
          Notes
        </Text>
        <TextInput
          placeholder="No onions..."
          placeholderTextColor="#6b7280"
          value={note}
          onChangeText={setNote}
          multiline
          className="h-24 rounded-2xl bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 text-sm"
        />
      </View>
     

      {/* Total bar na dnu */}
        <View className="mb-2">
        <View className="rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 flex-row items-center justify-between">
          <Text className="text-neutral-100 font-semibold text-sm">
            Total
          </Text>
          <Text className="text-neutral-100 font-semibold text-sm">
            ${money(product.price * quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

/* ---------------------- MAIN APP ---------------------- */

type ViewMode = "menu" | "details";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("appetizers");
  const [viewMode, setViewMode] = useState<ViewMode>("menu");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTax = useCartStore((state) => state.getTax);
  const getTotal = useCartStore((state) => state.getTotal);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.categoryId === selectedCategory),
    [selectedCategory]
  );

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  const handleOpenDetails = (product: Product) => {
    if (!product.inStock) return;
    setSelectedProduct(product);
    setViewMode("details");
  };

  const handleAddFromDetails = (quantity: number, note?: string) => {
    if (!selectedProduct) return;
    addItem(selectedProduct, quantity, note);
    setViewMode("menu");
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <StatusBar style="light" />

       {/* GORNJI BAR – Back to Menu + user badge + plus */}
      <View className="px-6 py-3 border-b border-neutral-800 bg-neutral-900 flex-row items-center justify-between">
        {/* BACK TO MENU dugme – identično layoutu sa slike */}
        <Pressable className="flex-row items-center">
          {/* bijeli kvadrat sa strelicom */}
          <View className="w-8 h-8 rounded-xl bg-neutral-100 items-center justify-center mr-2">
            <ChevronLeft size={16} color="#111827" />
          </View>

          {/* tekst */}
          <Text className="text-neutral-50 text-sm font-semibold">
            Back to Menu
          </Text>
        </Pressable>

        {/* USER BADGE desno – ostavi ovako */}
        <View className="flex-row items-center">
          <View className="flex-row items-center bg-neutral-800 rounded-full px-3 py-1.5 border border-neutral-700">
            <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center mr-2">
              <Text className="text-[11px] text-white font-semibold">
                AC
              </Text>
            </View>
            <Text className="text-neutral-100 text-xs mr-1">Aldin</Text>
            <ChevronDown size={14} color="#e5e7eb" />
          </View>
          <Pressable className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 items-center justify-center ml-2">
            <Text className="text-neutral-100 text-base">+</Text>
          </Pressable>
        </View>
      </View>

      {/* DVIJE KOLONE */}
      <View className="flex-1 flex-row bg-neutral-900">
        {/* LIJEVO – CART (~35%) */}
        <View className="w-[35%] border-r border-neutral-800 px-4 pt-4 pb-4">
          {/* Customer / Order Type dio – kao na prvom screenshotu */}
                    <View className="mb-4">
            {/* Naslovi iznad fieldova – centrirani kao na slici */}
            <View className="flex-row mb-1">
              <Text className="flex-1 text-center text-[12px] font-semibold text-neutral-100">
                Customer
              </Text>
              <Text className="flex-1 text-center text-[12px] font-semibold text-neutral-100">
                Order Type
              </Text>
            </View>

            {/* Fieldovi */}
            <View className="flex-row items-center mb-1">
              {/* Add Customer – tamna pozadina, plavi dashed border, veći radius */}
              <Pressable className="flex-row items-center flex-1 bg-neutral-900 rounded-2xl px-3 py-2 mr-2 border border-dashed border-sky-400/70">
                <Text className="text-neutral-50 text-base mr-2">＋</Text>
                <Text className="text-neutral-50 text-sm font-semibold">
                  Add Customer
                </Text>
              </Pressable>

              {/* Takeaway select – isti radius, puni svijetli border */}
              <Pressable className="flex-row items-center flex-1 bg-neutral-900 rounded-2xl px-3 py-2 ml-2 border border-neutral-400">
                <Text className="text-neutral-50 text-sm font-semibold flex-1">
                  Takeaway
                </Text>
                <ChevronDown size={16} color="#e5e7eb" />
              </Pressable>
            </View>

            {/* order id + broj itema */}
            <View className="flex-row justify-between">
              <Text className="text-neutral-500 text-[11px]">
                order_739868139381
              </Text>
              <Text className="text-neutral-500 text-[11px]">
                {totalItems} Items
              </Text>
            </View>
          </View>


             {/* Cart naslov + underline + broj itema desno */}
          <View className="flex-row items-end justify-between mb-2">
            <View>
              <Text className="text-neutral-50 text-lg font-semibold">
                Cart
              </Text>
              <View className="h-0.5 bg-sky-500 w-12 rounded-full mt-1" />
            </View>
           
          </View>

          {/* Cart items */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {items.length === 0 ? (
              <Text className="text-neutral-500 text-xs mt-4">
                Cart is empty. Select an item from the menu to begin.
              </Text>
            ) : (
              items.map((item) => <CartRow key={item.id} item={item} />)
            )}
          </ScrollView>

          {/* Totals + donja dugmad – layout kao na screenshotu 3 */}
          <View className="mt-2 border-t border-neutral-800 pt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-neutral-400 text-[11px]">
                Subtotal
              </Text>
              <Text className="text-neutral-200 text-[11px]">
                ${money(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-neutral-400 text-[11px]">Tax (10%)</Text>
              <Text className="text-neutral-200 text-[11px]">
                ${money(tax)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-neutral-400 text-[11px]">Voucher</Text>
              <Text className="text-neutral-200 text-[11px]">$0.00</Text>
            </View>
            <View className="flex-row justify-between mt-1 mb-2">
              <Text className="text-neutral-100 font-semibold text-sm">
                Total
              </Text>
              <Text className="text-neutral-100 font-semibold text-sm">
                ${money(total)}
              </Text>
            </View>

            {/* red 1: Discounts | Send to Kitchen */}
            <View className="flex-row mb-2">
              <Pressable className="flex-1 mr-2 flex-row items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 py-2">
                <Text className="mr-2 text-neutral-300 text-xs">🏷</Text>
                <Text className="text-neutral-100 text-[11px] font-medium">
                  Discounts
                </Text>
              </Pressable>
              <Pressable className="flex-1 ml-2 flex-row items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 py-2">
                <Text className="mr-2 text-neutral-300 text-xs">✈</Text>
                <Text className="text-neutral-100 text-[11px] font-medium">
                  Send to Kitchen ({totalItems || 0})
                </Text>
              </Pressable>
            </View>

            {/* red 2: More | Pay */}
            <View className="flex-row mt-1">
              <Pressable className="flex-1 mr-2 rounded-2xl bg-neutral-800 py-3 items-center">
                <Text className="text-neutral-100 text-xs font-semibold">
                  More
                </Text>
              </Pressable>
              <Pressable className="flex-1 ml-2 rounded-2xl bg-blue-600 py-3 items-center">
                <Text className="text-neutral-50 font-semibold text-xs">
                  Pay ${money(total)}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* DESNO – MENU ili DETAILS (~65%) */}
        <View className="w-[65%] px-4 pt-4 pb-4">
          {viewMode === "menu" || !selectedProduct ? (
            <>
              {/* Order Line naslov + crta + toolbar kao na SS 5 */}
              <View className="mb-3">
                <Text className="text-neutral-100 text-sm font-semibold">
                  Order Line
                </Text>
                <View className="h-px bg-neutral-800 mt-2" />
              </View>

              <View className="flex-row items-center justify-between mb-2">
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-neutral-100 text-sm font-semibold mr-3">
                      Menu
                    </Text>
                    <Text className="text-neutral-400 text-[11px] mr-1">
                      Order Type:
                    </Text>
                    <Text className="text-sky-400 text-[11px] font-medium">
                      Takeaway
                    </Text>
                  </View>
                </View>

                          
                <View className="flex-row items-center">
                  <View className="flex-row bg-neutral-900 rounded-xl px-1 py-1 border border-neutral-700">
                    {/* aktivni GRID view */}
                    <Pressable className="w-9 h-9 rounded-lg border border-sky-500 bg-neutral-800 items-center justify-center mr-1">
                      <Grid3X3 size={16} color="#bfdbfe" />
                    </Pressable>

                    {/* ostale ikonice – samo vizuelni placeholderi u istom boxu */}
                    <Pressable className="w-9 h-9 rounded-lg bg-neutral-800 items-center justify-center mr-1">
                      <Text className="text-neutral-400 text-xs">🔍</Text>
                    </Pressable>
                    <Pressable className="w-9 h-9 rounded-lg bg-neutral-800 items-center justify-center mr-1">
                      <Text className="text-neutral-400 text-xs">📦</Text>
                    </Pressable>
                    <Pressable className="w-9 h-9 rounded-lg bg-neutral-800 items-center justify-center mr-2">
                      <Text className="text-neutral-400 text-xs">🛋</Text>
                    </Pressable>

                    {/* Orders dugme */}
                    <Pressable className="px-3 h-9 rounded-lg bg-neutral-800 items-center justify-center mr-1">
                      <Text className="text-neutral-100 text-[11px]">
                        Orders
                      </Text>
                    </Pressable>

                    {/* Main Menu dropdown */}
                    <Pressable className="px-3 h-9 rounded-lg bg-neutral-800 flex-row items-center justify-center">
                      <Text className="text-neutral-100 text-[11px] mr-1">
                        Main Menu
                      </Text>
                      <ChevronDown size={12} color="#e5e7eb" />
                    </Pressable>
                  </View>
                </View>


              </View>

              {/* Kategorije */}
              <CategoryFilter
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {/* Grid sa karticama */}
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={4}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{
                  paddingTop: 4,
                  paddingBottom: 32,
                }}
                renderItem={({ item }) => (
                  <View className="flex-1 mr-3 mb-3">
                    <ProductCard
                      product={item}
                      onPress={() => handleOpenDetails(item)}
                    />
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <ItemDetailsPanel
              product={selectedProduct}
              onBack={() => setViewMode("menu")}
              onDone={handleAddFromDetails}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

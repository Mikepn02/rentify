
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filters = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide">
      <Select>
        <SelectTrigger className="w-full md:w-[180px] rounded-full border-2 border-black">
          <SelectValue placeholder="Filters" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Property</SelectLabel>
            <SelectItem value="property1">House</SelectItem>
            <SelectItem value="property2">Apartment or condo</SelectItem>
            <SelectItem value="property3">Villa</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
      <SelectTrigger className="w-full md:w-[180px] rounded-full border-2 border-black">
        <SelectValue placeholder="Price($)" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Price</SelectLabel>
          <SelectItem value="price1">$50-100$</SelectItem>
          <SelectItem value="price2">$150-300$</SelectItem>
          <SelectItem value="price3">$350-500$</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="w-full md:w-[180px] rounded-full border-2 border-black">
        <SelectValue placeholder="Rooms" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rooms</SelectLabel>
          <SelectItem value="room1">1 room</SelectItem>
          <SelectItem value="room2">2 rooms</SelectItem>
          <SelectItem value="room3">3 rooms</SelectItem>
          <SelectItem value="room3">4 rooms</SelectItem>
          <SelectItem value="room4">5 rooms</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="w-full md:w-[180px] rounded-full border-2 border-black">
        <SelectValue placeholder="Sorted Recommended" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort BY</SelectLabel>
          <SelectItem value="r1">Price: Low to High</SelectItem>
          <SelectItem value="r2">Price:  High to Low</SelectItem>
          <SelectItem value="r3">Number or reviews</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
};

export default Filters;

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const SortByFilter= () => {

    const searchParams = useSearchParams();
    
    return (
        <div className="w-full max-w-[500px]">
            <Select
                  // onValueChange={(value) => toggleFilterValue("sort", value, false)}
                  value={searchParams.get("sort") || undefined}
                >
                  <SelectTrigger className="w-full max-w-[180px]">
                    <SelectValue placeholder="Sort options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort Options</SelectLabel>
                      <SelectItem value="Sort by price (low to high)">
                        Price (Low to High)
                      </SelectItem>
                      <SelectItem value="Sort by price (high to low)">
                        Price (High to Low)
                      </SelectItem>
                      <SelectItem value="Sort by name (A to Z)">
                        Name (A to Z)
                      </SelectItem>
                      <SelectItem value="Sort by name (Z to A)">
                        Name (Z to A)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
        </div>
    );
};

export default SortByFilter;
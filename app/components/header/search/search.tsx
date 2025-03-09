"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const HeaderSearchButton = () => {
  // const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     setOpen(true);
  // }

  useEffect(() => {
    ref.current?.focus();
  }, [open]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }, { resetForm }) => {
      if (search.trim() !== "") {
        router.push(
          `/collections/product-category/wheels?q=${encodeURI(search)}`
        );
        setOpen(false);
        resetForm();
      }
    },
  });

  return (
    <>
      <div>
        <div>
          <form
            className=" h-full flex items-center"
            onSubmit={formik.handleSubmit}
          >
            {/* <div className='w-full h-full'>
                            <input
                                ref={ref}
                                type="text"
                                placeholder='Search Wheel'
                                className='px-10 font-medium bg-white text-2xl h-full border-none focus:outline-none w-full'
                                name="search"
                                id="search"
                                onChange={formik.handleChange}
                                value={formik.values.search}
                            />
                        </div>
                        <div className='w-max h-full'>
                            <button type="submit" className='h-full flex items-center px-10'>
                                <CiSearch className='text-3xl h-full text-btext' />
                            </button>
                        </div> */}
            {isSearchOpen && (
              <div className="fixed inset-0 z-50 bg-white lg:hidden">
                <div className="flex items-center gap-2 p-4">
                  <Input
                    ref={ref}
                    type="text"
                    placeholder="Search wheels"
                    name="search"
                    id="search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
              <div className="relative flex-1">
                <Input
                  ref={ref}
                  name="search"
                  id="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                  type="text"
                  placeholder="Search wheels"
                  className="w-full pl-4 pr-10"
                />
                <Button
                  type="submit"
                  className="absolute bottom-0 right-0 top-0 px-3"
                  variant="ghost"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-6 w-6" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HeaderSearchButton;

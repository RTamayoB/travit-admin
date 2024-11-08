import { TextField } from "@/ui/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  searchPlaceholder: string;
}

function SearchBar({
  searchPlaceholder,
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      placeholder={searchPlaceholder}
      leadIconUrl="/icons/search.svg"
      onValueChange={(e) => handleSearch(e)}
    />
  );
}

export default SearchBar;

import styles from "./Search.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, KeyboardEvent, ReactNode, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import SearchIcon from "./search.svg";
import { useRouter } from "next/router";

interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      goToSearch();
    }
  };

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button appearance="primary" className={styles.button} onClick={goToSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};

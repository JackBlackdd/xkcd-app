import { Text, Navbar, Input, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import { SearchIcon } from "./SearchIcon";
import { useState, useRef } from "react";

export function Header() {
  const [result, setResult] = useState([]);
  const searchRef = useRef();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResult(searchResults);
      });
  };
  return (
    <Navbar display="flex" justify="space-between">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Next
        </Text>
        <Text>xkcd</Text>
      </Navbar.Brand>

      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/search">Search</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content css={{ "@xsMax": { w: "100%", jc: "space-between" } }}>
        <Navbar.Item css={{ "@xsMax": { w: "100%", jc: "center" } }}>
          <Dropdown>
            <Input
              clearable
              type="search"
              ref={searchRef}
              contentRight={
                <Dropdown.Button light rounded>
                  <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                </Dropdown.Button>
              }
              css={{
                w: "100%",
                "@xsMax": { mw: "300px" },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
              onChange={handleChange}
            />
            <Dropdown.Menu aria-label="Dynamic Action" color="primary">
              {Boolean(result.length) &&
                result.map((result) => {
                  return (
                    <Dropdown.Item key={result.id}>
                      <Link href={`/comic/${result.id}`}>
                        <a>
                          <Text b>{result.title}</Text>
                        </a>
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              <Dropdown.Item key="all-results">
                <Link href={`/search?q=${getValue()}`}>
                  <a>
                    <Text weight>Mostrar los {result.length} Resultados</Text>
                  </a>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

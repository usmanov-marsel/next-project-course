import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Input, P, Rating, Tag, Textarea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Button appearance="primary">Кнопка</Button>
      <Button appearance="ghost" arrow="right">
        Кнопка 2
      </Button>
      <P>Текст здесь</P>
      <Tag size="m">Большой</Tag>
      <Tag color="red">норм</Tag>
      <Tag color="primary">норм</Tag>
      <Tag color="ghost">норм</Tag>
      <Tag color="gray">норм</Tag>
      <Tag color="green">норм</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Input placeholder="test" />
      <Textarea />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

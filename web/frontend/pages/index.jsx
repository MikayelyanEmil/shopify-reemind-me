import {
  LegacyCard,
  ColorPicker,
  Button,
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { useState } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();

  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  


  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card title="Choose Color" sectioned>
            <ColorPicker onChange={setColor} color={color} />
            <br />
            <Button primary>Save</Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          {/* <ProductsCard /> */}
          {/* {color} */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

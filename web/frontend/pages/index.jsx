import {
  LegacyCard,
  ColorPicker,
  RangeSlider,
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
import { useState, useCallback } from "react";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  const [rangeValue, setRangeValue] = useState(32);
  const fetch = useAuthenticatedFetch();

  // const [color, setColor] = useState({
  //   hue: 120,
  //   brightness: 1,
  //   saturation: 1,
  // });


  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  const handleSave = async () => {
    try {
      const response = await fetch('/api/customize', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({color: `${rangeValue}`})
      });

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card title="Roundness of borders" sectioned>
            <RangeSlider
              value={rangeValue}
              onChange={handleRangeSliderChange}
              output
            />
            <br />
            <Button onClick={handleSave} primary>Save</Button>
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

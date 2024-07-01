import {
  ColorPicker,
  RangeSlider,
  Grid,
  Button,
  Card,
  Page,
  ContextualSaveBar,
  Frame,
  Layout,
  LegacyStack,
  LegacyCard
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { TitleBar, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { ReminderPopup } from "../components/ReminderPopup";
import { ReminderButton } from "../components/ReminderButton";

import { useFormContext, useFormUpdateContext, useButtonContext, useButtonUpdateContext, useSaveContext } from "../components/ReemindmeContext";

export default function HomePage() {
  const { t } = useTranslation();
  const fetch = useAuthenticatedFetch();

  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const formColor = useFormContext();
  const formColorChange = useFormUpdateContext();
  const { buttonBorderRadius, buttonColor } = useButtonContext();
  const { buttonBorderRadiusChange, buttonColorChange } = useButtonUpdateContext();

  const handleSave = async () => {
    try {
      const response = await fetch('/api/customize', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formColor, buttonBorderRadius: buttonBorderRadius / 2, buttonColor })
      });
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout sectioned>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <LegacyStack>
                <LegacyCard title="Form styles" sectioned>
                  Form Border Color
                  <ColorPicker onChange={formColorChange} color={formColor} />

                  <br />

                  <Button onClick={handleSave} primary>Save</Button>
                </LegacyCard>
                <LegacyCard title="Button styles" sectioned>
                  Roundness of borders
                  <RangeSlider
                    value={buttonBorderRadius}
                    onChange={buttonBorderRadiusChange}
                    output
                  />

                  <br />


                  Color
                  <ColorPicker onChange={buttonColorChange} color={buttonColor} />
                </LegacyCard>
              </LegacyStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <LegacyStack>
                <LegacyCard title="Form" sectioned>
                  <ReminderPopup></ReminderPopup>
                </LegacyCard>
                <LegacyCard title="Button" sectioned>
                  <ReminderButton></ReminderButton>
                </LegacyCard>
              </LegacyStack>
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page >
  );
}

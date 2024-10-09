import { Button, Rows, Text } from "@canva/app-ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useAddElement } from "utils/use_add_element";

export const App = () => {
  const addElement = useAddElement();
  const onClick = () => {
    addElement({
      type: "text",
      children: ["Hello world!"],
    });
  };

  const intl = useIntl();

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              This is a sample app.
            "
            description="Text content for the sample app."
          />
        </Text>
        <Button variant="primary" onClick={onClick} stretch>
          {intl.formatMessage({
            defaultMessage: "Add",
           
          })}
        </Button>
      </Rows>
    </div>
  );
};

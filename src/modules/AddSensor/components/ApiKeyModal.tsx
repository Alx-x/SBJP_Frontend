import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import Link from "next/link";

export default function ApiKeyModal({
  modalOpen,
  onClose,
  apiKey,
}: {
  modalOpen: boolean;
  onClose: () => void;
  apiKey?: string;
}) {
  return (
    <>
      <Modal show={modalOpen} onClose={onClose}>
        <Modal.Header>Add new sensor</Modal.Header>
        <Modal.Body>
          <Alert color="info">
            Be sure to copy your API key now, it will never be shown again
          </Alert>
          <Label htmlFor="apiKey">API Key</Label>
          <TextInput id="apiKey" value={apiKey} disabled />
        </Modal.Body>
        <Modal.Footer className="justify-between">
          <Link href="/" passHref>
            <Button color="success">Return to dashboard</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";

const QRCodeDisplay = () => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const handleQrCodeGenerated = (message) => {
      if (message.event === "qrCodeGenerated" && message.qrCode) {
        setQrCode(message.qrCode);
      }
    };

    const exampleMessage = {
      event: "qrCodeGenerated",
      qrCode:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAEICAYAAACj9mr/AAAAAXNSR0IArs4c6QAAIABJ... (base64 string)",
    };
    handleQrCodeGenerated(exampleMessage);
  }, []);

  return (
    <div>
      <h3>QR Code Gerado</h3>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" />
      ) : (
        <p>Aguardando o QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;

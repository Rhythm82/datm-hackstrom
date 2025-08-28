import { jsPDF } from "jspdf";
import heroImage from '../assets/hero.jpg'; // adjust path if needed

// Utility: convert image to Base64
const toBase64 = (url) => {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};

export const generatePdf = async (data) => {
  // Convert hero image to Base64
  const bannerImg = await toBase64(heroImage);

  const doc = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Add banner image at top
  if (bannerImg) {
    doc.addImage(bannerImg, "PNG", 15, 10, 180, 60);
  }

  // Title
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hack-Strom Hackathon Registration", 105, 50, { align: "center" });

  // Separator line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  // Participant details
  let y = 65;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  Object.entries(data).forEach(([key, value]) => {
    if (key === "bannerImg") return; // skip image

    let displayKey = key.replaceAll("_", " ");
    if (key === "participant_id") displayKey = "Unique ID"; // rename in PDF

    if (key.toLowerCase().includes("id")) {
      // Highlight ID with border
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(230, 230, 250); // light purple background
      doc.rect(20, y - 4, 170, 10, "F");
      doc.setTextColor(0, 0, 0);
      doc.text(`${displayKey}: ${value}`, 22, y + 3);
    } else {
      doc.setTextColor(50, 50, 50);
      doc.text(`${displayKey}: ${value}`, 20, y);
    }
    y += 12;
  });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.text("© DATM-Hack Strom 2025", 105, 285, { align: "center" });

  // Save PDF
  doc.save(`${data.name || "registration"}_HackStrom.pdf`);
};
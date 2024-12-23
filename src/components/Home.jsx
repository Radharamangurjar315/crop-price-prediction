
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling

function Home() {
  // Slides data for the carousel
  const slides = [
    {
      text: "First slide",
      src: "/src/assets/homenew.jpeg",
      label: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      text: "Second slide",
      src: "/src/assets/homeui3.jpeg",
      label: "Second slide label",
      description: "Welcome to Sahayk: Your Farming Companion",
    },
    {
      text: "Third slide",
      src: "/src/assets/homeui2.jpg",
      label: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Fullscreen Carousel */}
      <Carousel style={{ height: "100%", width: "100%" }}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index} style={{ height: "100%" }}>
            {/* Fullscreen Image */}
            <img
              className="d-block w-100"
              src={slide.src}
              alt={slide.text}
              style={{
                height: "100vh", // Full viewport height
                width: "100vw", // Full viewport width
                objectFit: "cover", // Ensures the image covers the entire viewport
              }}
            />
            {/* Caption */}
            <Carousel.Caption>
              <h3>{slide.label}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;

export default function Loading() {
  return (
    <div className="container-fluid" style={{ height: '90vh' }}>
      <lottie-player
        src="https://lottie.host/e2fd1aed-bbba-40d2-9570-1c58bcaa5e59/PRpxm7KXpu.json"
        background="transparent"
        speed="1"
        style={{ width: '400px', height: '300px', margin: 'auto', marginTop: '100px' }}
        direction="1"
        mode="normal"
        loop
        autoplay></lottie-player>
    </div>
  );
}

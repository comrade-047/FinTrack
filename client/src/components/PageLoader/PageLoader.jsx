import ContentLoader from "react-content-loader"

const PageLoader = () => (
  <div style={styles.overlay}>
    <ContentLoader
      speed={1.8}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Simulated card-style loader */}
      <rect x="0" y="0" rx="5" ry="5" width="400" height="20" />
      <rect x="0" y="30" rx="5" ry="5" width="300" height="15" />
      <rect x="0" y="55" rx="5" ry="5" width="350" height="15" />
      <rect x="0" y="80" rx="5" ry="5" width="380" height="15" />
      <rect x="0" y="110" rx="8" ry="8" width="100" height="30" />
    </ContentLoader>
  </div>
)

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
}

export default PageLoader

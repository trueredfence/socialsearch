import "@app/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title:"Social Search",
  description:"Search social presence with email and mobile number"
}

const RootLayout = ({children})=> {
  return (
    <html lang="eng">
      <body>
        <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
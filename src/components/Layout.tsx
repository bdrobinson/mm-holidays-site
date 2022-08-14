import React, { useState, ReactNode, FC } from "react"
import styled from "styled-components"
import "normalize.css"

import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Footer from "./Footer"
import PageGutter from "./PageGutter"
import { MOBILE_WIDTH, Z_INDICES } from "../constants"

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden; /* hack for mobile safari, needs to be fixed*/
`

const Content = styled.div`
  position: relative;
  flex-grow: 1;
`

const ContentBlur = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.blur};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  @media (min-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const HeaderAndHeroContainer = styled.div`
  position: relative;
  color: ${props => (props.theme === "dark" ? "#333" : "white")};
`

const HeaderContainer = styled.div<{ overHero: boolean }>`
  position: ${props => (props.overHero ? "absolute" : "relative")};
  top: 0;
  left: 0;
  right: 0;
`

interface Props {
  children: ReactNode
  applyGutter?: boolean
  hero?: ReactNode
  theme?: "light" | "dark" | null
  showNav?: boolean
}

const Layout: FC<Props> = ({
  children,
  applyGutter = true,
  hero,
  theme,
  showNav = true,
}: Props) => {
  const [mobileNavMenuExpanded, setMobileNavMenu] = useState(false)

  return (
    <Main>
      {mobileNavMenuExpanded && <ContentBlur />}
      <GlobalStyles />
      <HeaderAndHeroContainer theme={theme}>
        {hero != null && hero}
        {showNav && (
          <HeaderContainer overHero={hero != null}>
            <Header
              theme={theme}
              menuExpanded={mobileNavMenuExpanded}
              setMenuExpanded={setMobileNavMenu}
              displayShadows={hero != null}
            />
          </HeaderContainer>
        )}
      </HeaderAndHeroContainer>
      <Content>
        {applyGutter ? (
          <PageGutter>{children}</PageGutter>
        ) : (
          <div>{children}</div>
        )}
      </Content>
      <Footer />
    </Main>
  )
}

export default Layout

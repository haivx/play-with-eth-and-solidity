import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Menu.Item
        name="home"
        // active={activeItem === "home"}
        //   onClick={this.handleItemClick}
      >
        CrowdCoin
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">Campaign</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/campaigns/new">+</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;

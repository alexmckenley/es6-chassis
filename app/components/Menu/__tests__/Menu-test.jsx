import React from 'react/addons';
import { expect } from 'chai';

import Menu from '../Menu.jsx';
import MenuItem from '../MenuItem.jsx';

describe('Menu', () => {
  const { TestUtils } = React.addons;

  const menuItems = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
  ];

  describe('Rendering', () => {
    // Here we create a mocked MenuItem component.
    class MockedMenuItem extends MenuItem {
      render() {
        return (
          <li className={'mocked-menu-item'}>{this.props.item.label}</li>
        );
      }
    }

    // Here we set the mocked MenuItem component.
    Menu.__Rewire__('MenuItem', MockedMenuItem);

    const menu = TestUtils.renderIntoDocument(
      <Menu items={menuItems} />
    );
    const menuElem = React.findDOMNode(menu);
    const items = menuElem.querySelectorAll('li');

    it('Should render the menu items', () => {
      expect(items.length).to.equal(2);
    });

    it('Should render the menu item labels', () => {
      Array.prototype.forEach.call(items, (item, i) => {
        expect(item.textContent.trim()).to.equal(menuItems[i].label);
      });
    });

    it('Should render the mocked menu item', () => {
      expect(menuElem.querySelectorAll('li')[0].className).to.equal('mocked-menu-item');
    });
  });

  describe('Events', () => {
    // Example of simulating browser events.
    it('Should handle click events', () => {
      let clicked = 0;

      class MockedMenuItemWithClickHandler extends MenuItem {
        onItemClick() {
          clicked++;
        }
      }

      Menu.__Rewire__('MenuItem', MockedMenuItemWithClickHandler);

      const menu = TestUtils.renderIntoDocument(
        <Menu items={menuItems} />
      );
      const menuElem = React.findDOMNode(menu);
      const items = menuElem.querySelectorAll('li');
      const node = items[0].querySelector('a');

      TestUtils.Simulate.click(node);
      TestUtils.Simulate.click(node);

      expect(clicked).to.equal(2);
    });
  });
});

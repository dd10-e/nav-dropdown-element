class NavDropdown extends HTMLElement {
  get root() {
    return this.closest("nav-dropdown");
  }

  get button() {
    return this.querySelector("button");
  }

  get popover() {
    return this.querySelector("nav-dropdown-popover");
  }

  toggle() {
    if (this.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.setAttribute("open", "");
    this.button.setAttribute("aria-expanded", "true");
    this.addEventListener("keydown", this.keydownEvent);

    document.addEventListener("mousedown", this.documentOutsideEvent);
    document.addEventListener("touchstart", this.documentOutsideEvent);
    document.addEventListener("focusin", this.documentOutsideEvent);
  }

  close() {
    this.removeAttribute("open");
    this.button.setAttribute("aria-expanded", "false");
    this.removeEventListener("keydown", this.keydownEvent);

    document.removeEventListener("mousedown", this.documentOuterEvent);
    document.removeEventListener("touchstart", this.documentOuterEvent);
    document.removeEventListener("focusin", this.documentOuterEvent);
  }

  keydownEvent = (event) => {
    if (event.key == "Escape") {
      this.close();
      this.button.focus();
    }
  };

  documentOutsideEvent = (event) => {
    let interactedInside =
      event.target instanceof Node && this.contains(event.target);

    if (!interactedInside) {
      this.close();
    }
  };
}

class NavDropdownButton extends NavDropdown {
  get button() {
    return this.querySelector("button")
  }

  connectedCallback() {
    this.button.setAttribute("aria-haspopup", "menu");
    this.button.addEventListener("click", () => {
      this.root.toggle();
    });
  }
}

class NavDropdownPopover extends NavDropdown {
  connectedCallback() {
    this.id = "popover-" + this.root.id;
    this.root.button.setAttribute("aria-controls", this.id);
  }
}


window.customElements.define("nav-dropdown", NavDropdown);
window.customElements.define("nav-dropdown-button", NavDropdownButton);
window.customElements.define("nav-dropdown-popover", NavDropdownPopover);
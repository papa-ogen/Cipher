(function() {
  "use strict";
  
  class TabList {
    constructor(tabList) {
      this.tabs = tabList.querySelectorAll(".tab");
      this.tabContents = tabList.querySelectorAll(".tab-content");
      this.tabActiveClass = "tab-active";
      this.tabContentActiveClass = "tab-content-active";

      if (this.tabs === undefined || this.tabContents === undefined) return;

      this.addOnClick();

    }

    addOnClick() {
      let link = {};

      for (let tab of this.tabs) {
        link = tab.getElementsByTagName("a")[0].addEventListener("click", e => {
          this.toggleTab(e);
        });
      }
    }

    toggleTab(e) {
      e.preventDefault();

      let tabId = e.target.parentNode.dataset.tab;

      // Activate and deactivate tab
      for (let tab of this.tabs) {
        if (tabId !== tab.dataset.tab) {
          tab.classList.remove(this.tabActiveClass);
        } else {
          tab.classList.add(this.tabActiveClass);
        }
      }

      // Hide and show Tab Contents
      for (let tabContent of this.tabContents) {
        if (tabId !== tabContent.dataset.for) {
          tabContent.classList.remove(this.tabContentActiveClass);
        } else {
          tabContent.classList.add(this.tabContentActiveClass);
        }
      }
    }
  }

  // Init - looks for all matching classes (multiple tab lists)
  const tabLists = document.querySelectorAll(".tab-list-wrapper");

  for (let tabList of tabLists) {
    new TabList(tabList);
  }
})();

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import css from "@/styles/sidebar.module.scss";
import TaskModal from "../ui/TaskModal";

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tasklist");
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleTabClick = (tab: string) => {
    if (activeTab === tab) {
      setActiveTab("");
      localStorage.removeItem("activeTab");
    } else {
      setActiveTab(tab);
      localStorage.setItem("activeTab", tab);
    }
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [pathname]);

  const isActiveTab = (tab: string) => activeTab === tab;

  return (
    <div className={`freelance`}>
      <div className={`${css.mobileNav}`}>
        <div className={`${css.logoSection}`}>Dashboard</div>
        <button
          className={`${css.menuToggle} ${isMobileMenuOpen ? css.close : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={css.hamburgerLine}></span>
          <span className={css.hamburgerLine}></span>
          <span className={css.hamburgerLine}></span>
        </button>
      </div>

      <div className={`${css.sidebar} ${isMobileMenuOpen ? "" : css.menuOpen}`}>
        <div className={`${css.upperSection}`}>
          <div className={`${css.logoSection}`}>Dashboard</div>
          <div className={`${css.tabs} ${css.menuContainer}`}>
            <div
              className={`${css.sidebarTab} ${
                isActiveTab("overview") ? css.active : ""
              }`}
              onClick={() => handleTabClick("overview")}
            >
              <img src="/assets/overview.svg" alt="Overview" />
              <div className={`${css.labelText}`}>Overview</div>
            </div>

            <div
              className={`${css.sidebarTab} ${
                isActiveTab("tasklist") ? css.active : ""
              }`}
              onClick={() => handleTabClick("tasklist")}
            >
              <img src="/assets/invoice.svg" alt="Task List" />
              <div className={`${css.labelText}`}>Task List</div>
            </div>
          </div>
        </div>

        <div className={`${css.profileLogOut}`}>
          <div className={`${css.profileDetails}`}>
            <div className={`${css.profileImage}`}>
              <img src="/assets/profileGirl.svg" alt="" />
            </div>
            <div className={`${css.profileContent}`}>
              <div className={`${css.userName} notosans-600`}>
                Hritik Shettigar
              </div>
              <div className={`${css.userEmail} notosans-400`}>
                hshettigar46@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

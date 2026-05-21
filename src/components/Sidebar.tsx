import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  showMobileSidebar: boolean;
  setShowMobileSidebar: (show: boolean) => void;
}

const mockMenuItems = [
  { id: 1, label: "Inicio", icon: "fa-home", slug: "/", children: [] },
  {
    id: 2,
    label: "Administración",
    icon: "fa-cog",
    slug: "/admin",
    children: [
      { id: 21, label: "Módulos", slug: "/admin/modulos" },
      { id: 22, label: "Perfiles", slug: "/admin/perfiles" },
      { id: 23, label: "Usuarios", slug: "/admin/usuarios" },
    ],
  },
  {
    id: 3,
    label: "Ayuda",
    icon: "fa-question-circle",
    slug: "/help",
    children: [],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  showMobileSidebar,
  setShowMobileSidebar,
}) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    mockMenuItems.forEach((item) => {
      if (
        item.children?.some((child) => location.pathname.startsWith(child.slug))
      ) {
        setExpandedMenu(item.label);
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isActivePath = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const getMenuKey = (label: string): string => {
    return label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const renderMenuItem = (
    item: (typeof mockMenuItems)[0],
    isMobile = false,
  ) => {
    const hasChildren = item.children?.length > 0;
    const isExpanded = expandedMenu === item.label;
    const isActive = isActivePath(item.slug);
    const menuKey = getMenuKey(item.label);

    if (hasChildren) {
      return (
        <div key={item.id} className="sidebar-group">
          <button
            onClick={() => toggleMenu(item.label)}
            className={`sidebar-item w-100 px-3 py-2 rounded ${
              isExpanded || isActive ? "active" : ""
            } ${isExpanded ? "sidebar-item-expanded" : ""}`}
            title={item.label}
            aria-expanded={isExpanded}
          >
            <div className="d-flex align-items-center gap-3">
              <i
                className={`fas ${item.icon} fs-6`}
                style={{ width: "20px", flexShrink: 0 }}
              ></i>
              {!sidebarCollapsed && (
                <span className="fw-medium">{item.label}</span>
              )}
            </div>
            {!sidebarCollapsed && (
              <i
                className={`fas fa-chevron-${isExpanded ? "up" : "down"} fs-6`}
              ></i>
            )}
          </button>

          {!sidebarCollapsed && isExpanded && (
            <div className="ms-4 mt-1 d-flex flex-column gap-1">
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  to={child.slug}
                  onClick={() => isMobile && setShowMobileSidebar(false)}
                  className={`sidebar-subitem px-3 py-2 rounded ${isActivePath(child.slug) ? "active" : ""}`}
                  title={child.label}
                >
                  <i
                    className="fas fa-circle"
                    style={{ fontSize: "8px", width: "16px" }}
                  ></i>
                  <span>{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.slug}
        onClick={() => isMobile && setShowMobileSidebar(false)}
        className={`sidebar-item px-3 py-2 rounded ${isActive ? "active" : ""}`}
        title={item.label}
      >
        <div className="d-flex align-items-center gap-3">
          <i
            className={`fas ${item.icon} fs-6`}
            style={{ width: "20px", flexShrink: 0 }}
          ></i>
          {!sidebarCollapsed && <span>{item.label}</span>}
        </div>
      </Link>
    );
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside
      className={`bg-sidebar-700 text-white d-none d-md-flex flex-column position-relative`}
      style={{
        width: sidebarCollapsed ? "70px" : "260px",
        transition: "width 0.3s ease",
        flexShrink: 0,
        minWidth: "70px",
      }}
    >
      <button
        className="position-absolute btn btn-sm btn-sidebar-light rounded-circle shadow"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        style={{
          right: "-12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          width: "32px",
          height: "32px",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.3)",
        }}
        title={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
      >
        <i
          className={`fas fa-${sidebarCollapsed ? "chevron-right" : "chevron-left"} fs-6`}
        ></i>
      </button>

      <div className="d-flex flex-column gap-1 p-3 overflow-auto custom-scrollbar flex-grow-1">
        {mockMenuItems.map((item) => renderMenuItem(item))}
      </div>
    </aside>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {showMobileSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
      <div
        className={`offcanvas offcanvas-start bg-sidebar-700 text-white show`}
        tabIndex={-1}
        style={{
          display: showMobileSidebar ? "block" : "none",
          zIndex: 1050,
          width: "260px",
        }}
      >
        <div className="offcanvas-header border-bottom border-white-10">
          <h5 className="offcanvas-title fw-bold">Menú Tamila</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowMobileSidebar(false)}
          />
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          {mockMenuItems.map((item) => renderMenuItem(item, true))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

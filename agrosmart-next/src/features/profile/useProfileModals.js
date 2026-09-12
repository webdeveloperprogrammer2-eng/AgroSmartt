"use client";

import { useState } from "react";

// Ҳолати ҳамаи модалҳои кабинет дар як ҷо ҷамъ шудааст.
// Ин ҳам ProfilePage-ро кӯтоҳ мекунад, ҳам дар ProfileModals
// танҳо як объекти `modals` фиристода мешавад.
export function useProfileModals() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [addLandOpen, setAddLandOpen] = useState(false);
  const [editLand, setEditLand] = useState(null);

  const [addMedOpen, setAddMedOpen] = useState(false);
  const [editMed, setEditMed] = useState(null);

  return {
    notifOpen,
    setNotifOpen,
    drawerOpen,
    setDrawerOpen,
    addProductOpen,
    setAddProductOpen,
    editProduct,
    setEditProduct,
    addLandOpen,
    setAddLandOpen,
    editLand,
    setEditLand,
    addMedOpen,
    setAddMedOpen,
    editMed,
    setEditMed,
  };
}

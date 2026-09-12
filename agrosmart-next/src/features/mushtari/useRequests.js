"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchRequests, createRequest, updateRequest, deleteRequest } from "./api";

// Ҳамаи кор бо дархостҳои харидорон: хондан, илова, таҳрир ва несткунӣ.
// Саҳифа танҳо модалҳоро мекушояд — мантиқи сервер дар ҳамин ҷост.
export function useRequests(user, t, dialog) {
  const [requests, setRequests] = useState([]);

  const loadRequests = useCallback(async () => {
    try {
      const data = await fetchRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function submitCreate(form, onDone) {
    const newRequest = {
      companyName: form.company,
      productName: form.product,
      volume: form.volume,
      description: form.desc,
      // userId нигоҳ дошта мешавад, то баъдтар соҳиби дархостро дақиқ шиносем
      userId: user.id,
      creatorName: user.userName || user.name || t("defaultFarmerName"),
      creatorPhone: user.userPhone || user.phone || "",
      createdAt: new Date().toISOString(),
    };

    try {
      await createRequest(newRequest);
      onDone();
      await loadRequests();
      await dialog.success(t("contractSuccess"));
    } catch {
      await dialog.error(t("error"));
    }
  }

  async function submitEdit(request, form, onDone) {
    try {
      await updateRequest(request.id, { ...request, ...form });
      onDone();
      await loadRequests();
      await dialog.success(t("requestUpdated"));
    } catch {
      await dialog.error(t("error"));
    }
  }

  async function submitDelete(request) {
    const ok = await dialog.confirm({
      title: t("deleteRequestConfirm"),
      description: t("actionIrreversible"),
      confirmText: t("deleteModalYes"),
      danger: true,
    });
    if (!ok) return;

    try {
      await deleteRequest(request.id);
      await loadRequests();
      await dialog.success(t("requestDeleted"));
    } catch {
      await dialog.error(t("error"));
    }
  }

  return { requests, submitCreate, submitEdit, submitDelete };
}

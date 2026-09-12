import { useState } from "react";
import { KeyRound, Phone, Trash2, UserRound } from "lucide-react";
import AvatarPicker from "./AvatarPicker";
import { settingsApi } from "../../../api/settingsApi";
import { useTranslation } from "../../../context/language";

export default function DrawerAccountForms({ user, onUpdated, onDeleted }) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    userName: user.userName || "",
    city: user.city || "",
    age: user.age || "",
  });
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [phone, setPhone] = useState({ userPhone: user.userPhone || "", password: "" });
  const [pass, setPass] = useState({ oldPassword: "", newPassword: "" });
  const [note, setNote] = useState({ text: "", bad: false });

  async function run(action, okText) {
    setNote({ text: "", bad: false });
    try {
      const result = await action();
      setNote({ text: okText, bad: false });
      return result;
    } catch (err) {
      setNote({ text: err.message || t("error"), bad: true });
      return null;
    }
  }

  async function saveProfile(e) {
    e.preventDefault();
    const saved = await run(
      () => settingsApi.updateProfile(user.id, { ...profile, avatar, age: Number(profile.age) || undefined }),
      t("settingsSaved")
    );
    if (saved) onUpdated(saved.user || saved);
  }

  async function savePhone(e) {
    e.preventDefault();
    const saved = await run(
      () => settingsApi.updatePhone(user.id, phone.userPhone, phone.password),
      t("settingsSaved")
    );
    if (saved) {
      setPhone((prev) => ({ ...prev, password: "" }));
      onUpdated(saved.user || saved);
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    const ok = await run(
      () => settingsApi.updatePassword(user.id, pass.oldPassword, pass.newPassword),
      t("settingsSaved")
    );
    if (ok) setPass({ oldPassword: "", newPassword: "" });
  }

  async function removeAccount() {
    const password = window.prompt(t("deleteAccountAsk"));
    if (!password) return;
    const done = await run(() => settingsApi.deleteAccount(user.id, password), t("accountDeleted"));
    if (done) onDeleted();
  }

  return (
    <div className="dw-group">
      <h4 className="dw-group-title">{t("accountSettings")}</h4>

      <form className="dw-form" onSubmit={saveProfile}>
        <span className="dw-form-title">
          <UserRound size={15} /> {t("profileData")}
        </span>
        <AvatarPicker name={profile.userName} value={avatar} onChange={setAvatar} />
        <input
          value={profile.userName}
          onChange={(e) => setProfile({ ...profile, userName: e.target.value })}
          placeholder={t("fullNameLabel")}
        />
        <div className="dw-form-pair">
          <input
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            placeholder={t("cityAddressLabel")}
          />
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            placeholder={t("ageLabel")}
          />
        </div>
        <button type="submit">{t("save")}</button>
      </form>

      <form className="dw-form" onSubmit={savePhone}>
        <span className="dw-form-title">
          <Phone size={15} /> {t("phoneNumberLabel")}
        </span>
        <input
          value={phone.userPhone}
          onChange={(e) => setPhone({ ...phone, userPhone: e.target.value })}
          placeholder="+992 900 00 00 00"
        />
        <input
          type="password"
          value={phone.password}
          onChange={(e) => setPhone({ ...phone, password: e.target.value })}
          placeholder={t("passwordLabel")}
        />
        <button type="submit">{t("save")}</button>
      </form>

      <form className="dw-form" onSubmit={savePassword}>
        <span className="dw-form-title">
          <KeyRound size={15} /> {t("changePassword")}
        </span>
        <input
          type="password"
          value={pass.oldPassword}
          onChange={(e) => setPass({ ...pass, oldPassword: e.target.value })}
          placeholder={t("oldPassword")}
        />
        <input
          type="password"
          value={pass.newPassword}
          onChange={(e) => setPass({ ...pass, newPassword: e.target.value })}
          placeholder={t("newPassword")}
        />
        <button type="submit">{t("save")}</button>
      </form>

      {note.text && <p className={`dw-note ${note.bad ? "is-bad" : ""}`}>{note.text}</p>}

      <button type="button" className="dw-danger" onClick={removeAccount}>
        <Trash2 size={15} /> {t("deleteAccount")}
      </button>
    </div>
  );
}

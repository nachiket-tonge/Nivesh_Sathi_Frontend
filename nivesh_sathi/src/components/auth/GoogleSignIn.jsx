"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../lib/api";
import ProfessionModal from "./ProfessionModal";

export default function GoogleSignIn() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [credential, setCredential] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);

  // Called after Google authentication succeeds
  const handleGoogleSuccess = (credentialResponse) => {
    setCredential(credentialResponse.credential);
    setShowModal(true);
  };

  // Called when user clicks Continue in the profession modal
  const handleContinue = async () => {
    if (!profession) {
      alert("Please select your profession.");
      return;
    }

    try {
      setLoading(true);

      const result = await googleLogin({
        idToken: credential,
        profession,
      });

      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
      localStorage.setItem("userEmail", result.email);
      localStorage.setItem("userProfession", result.profession);

      setShowModal(false);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setCredential("");
    setProfession("");
  };

  return (
    <>
      

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Login Failed")}
          useOneTap={false}
        />
      </div>

      <ProfessionModal
        open={showModal}
        profession={profession}
        setProfession={setProfession}
        onContinue={handleContinue}
        onCancel={handleCancel}
      />

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <div className="rounded-xl bg-white px-6 py-4 shadow-lg">
            <p className="text-sm font-medium text-slate-700">
              Signing you in...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

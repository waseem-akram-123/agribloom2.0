"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useTranslation } from "@/hooks/useTranslation";

export default function CallToAction() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <section className="bg-green-50 py-16 px-6 md:px-20 text-center text-green-900">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {isAuthenticated
          ? t('callToAction.authenticatedTitle')
          : t('callToAction.unauthenticatedTitle')}
      </motion.h2>

      <p className="text-lg text-green-800 max-w-2xl mx-auto mb-8">
        {isAuthenticated
          ? t('callToAction.authenticatedDesc')
          : t('callToAction.unauthenticatedDesc')}
      </p>

      {isAuthenticated ? (
        <Link href="/agrilens">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-5 rounded-full shadow-lg">
            {t('callToAction.goToAgrilens')}
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-5 rounded-full shadow-lg">
            {t('callToAction.createAccount')}
          </Button>
        </Link>
      )}
    </section>
  );
}

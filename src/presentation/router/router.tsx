import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  OrthographyPage, AssistantPage, ProsConsPage, ProsConsStreamPage, TranslatePage,
  TextToAudioPage, ImageGenerationPage, ImageTunningPage, AudioToTextPage
} from "../pages/index";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
  {
    to: "/orthography",
    icon: "fa-solid fa-spell-check",
    title: "Orthography",
    description: "Correct spelling",
    component: <OrthographyPage />
  },
  {
    to: "/pros-cons",
    icon: "fa-solid fa-code-compare",
    title: "Pros & Cons",
    description: "Compare pros and cons",
    component: <ProsConsPage />
  },
  {
    to: "/pros-cons-stream",
    icon: "fa-solid fa-water",
    title: "Pros & Cons Stream",
    description: "With message stream",
    component: <ProsConsStreamPage />
  },
  {
    to: "/translate",
    icon: "fa-solid fa-language",
    title: "Translate",
    description: "Texts to other languages",
    component: <TranslatePage />
  },
  {
    to: "/text-to-audio",
    icon: "fa-solid fa-podcast",
    title: "Text to Audio",
    description: "Convert text to audio",
    component: <TextToAudioPage />
  },
  {
    to: "/audio-to-text",
    icon: "fa-solid fa-comment-dots",
    title: "Audio to Text",
    description: "Convert audio to text",
    component: <AudioToTextPage />
  },
  {
    to: "/image-generation",
    icon: "fa-solid fa-image",
    title: "Images",
    description: "Generate images",
    component: <ImageGenerationPage />
  },
  {
    to: "/image-tunning",
    icon: "fa-solid fa-wand-magic",
    title: "Edit Image",
    description: "Continuous generation",
    component: <ImageTunningPage />
  },
  {
    to: "/assistant",
    icon: "fa-solid fa-user",
    title: "Assistant",
    description: "Assistant information",
    component: <AssistantPage />
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map(route => ({
        path: route.to,
        element: route.component
      })),
      {
        path: '',
        element: <Navigate to={menuRoutes[0].to} />
      }
    ]
  }
])
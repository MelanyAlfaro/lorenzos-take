import { QuestSection } from "./QuestSection";
import { WelcomeCard } from "./WelcomeCard";
import { Header } from "./Header";

export function StudentDashboard() {
  return (
    <div>
      <Header />
      <WelcomeCard />
      <QuestSection />
    </div>
  );
}

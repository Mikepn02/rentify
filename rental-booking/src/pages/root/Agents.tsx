import { Agent } from "@/@types/types";
import Agents from "@/components/agents/Agents";



interface AgentsPageProps{
    agents: Agent[]
}

const AgentPage = ({ agents }: AgentsPageProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <head>
        <title>Prime Properties | Our Agents</title>
        <link rel="shortcut icon" href="/icons/logo.svg" type="image/x-icon" />
      </head>

      <div className="xl:w-3/5 w-full lg:w-4/5 md:px-12 px-4 lg:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-20">
        {agents.map((agent) => (
            <Agents key={agent._id} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentPage;

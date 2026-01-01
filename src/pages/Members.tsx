import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

const members = [
  { name: "Member One" },
  { name: "Member Two" },
  { name: "Member Three" },
  { name: "Member Four" },
  { name: "Member Five" },
];

const Members = () => {
  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-12">Members</h1>
        
        <ul className="space-y-4">
          {members.map((member, index) => (
            <li key={index} className="text-lg">
              {member.name}
            </li>
          ))}
        </ul>
      </PageContainer>
    </Layout>
  );
};

export default Members;

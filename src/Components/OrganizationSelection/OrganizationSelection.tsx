import { Organization } from "../../apiTypes";

type OrganizationSelectionProps = {
  organizations: Organization[];
  currentOrganization: Organization | undefined;
  onOrganizationChange: (newName: string) => void;
};

export const OrganizationSelection = ({
  organizations,
  currentOrganization,
  onOrganizationChange,
}: OrganizationSelectionProps) => {
  const onSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onOrganizationChange(ev.target.value);
  };

  return (
    <div className="form-row">
      <label htmlFor="organization-selection">select organization</label>
      {!!organizations.length && (
        <select
          onChange={onSelectChange}
          value={currentOrganization?.login}
          id="organization-selection"
        >
          {organizations.map(({ id, login }) => (
            <option key={id} value={login}>
              {login}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

import { useMemo, useState } from 'react';

export type Property = {
  id: number;
  title: string;
  address: string;
  rent: number;
  status: 'Alugado' | 'Vago' | 'Manutenção';
  owner: string;
  tenant?: string;
  leaseEnd?: string;
  nextPaymentDue?: string;
  bedrooms: number;
  bathrooms: number;
};

const fakeProperties: Property[] = [
  {
    id: 1,
    title: 'Apartamento reformado no centro',
    address: 'Rua das Flores, 220',
    rent: 2500,
    status: 'Alugado',
    owner: 'Pedro Silva',
    tenant: 'Ana Costa',
    leaseEnd: '30/09/2025',
    nextPaymentDue: '10/05/2025',
    bedrooms: 2,
    bathrooms: 1
  },
  {
    id: 2,
    title: 'Cobertura com vista para o mar',
    address: 'Av. Atlântica, 1020',
    rent: 8700,
    status: 'Alugado',
    owner: 'Marina Souza',
    tenant: 'Rafael Lima',
    leaseEnd: '15/12/2025',
    nextPaymentDue: '05/05/2025',
    bedrooms: 3,
    bathrooms: 2
  },
  {
    id: 3,
    title: 'Casa familiar próxima ao parque',
    address: 'Alameda das Palmeiras, 14',
    rent: 4200,
    status: 'Manutenção',
    owner: 'Carlos Pereira',
    bedrooms: 4,
    bathrooms: 3
  }
];

const statusClasses = {
  Vago: 'status available',
  Alugado: 'status rented',
  Manutenção: 'status maintenance'
};

function App() {
  const [query, setQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(fakeProperties);
  const [selected, setSelected] = useState<Property | null>(fakeProperties[0]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    address: '',
    rent: 0,
    owner: '',
    tenant: '',
    leaseEnd: '',
    nextPaymentDue: ''
  });

  const filtered = useMemo(
    () => properties.filter(p =>
      [p.title, p.address, p.owner, p.status, p.tenant, p.leaseEnd, p.nextPaymentDue]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
    ),
    [properties, query]
  );

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">QA Study</p>
          <h1>Gestão de Imóveis Alugados</h1>
          <p>Simulação de gerenciamento de imóveis alugados com contratos e pagamentos.</p>
        </div>
      </header>

      <section className="toolbar">
        <input
          type="search"
          placeholder="Buscar por título, endereço, proprietário, inquilino ou status"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="badge">{filtered.length} imóveis</span>
      </section>

      <section className="new-property-form">
        <h2>Registrar novo imóvel alugado</h2>
        <div className="form-grid">
          <label>
            Título
            <input
              value={newProperty.title}
              onChange={event => setNewProperty({ ...newProperty, title: event.target.value })}
            />
          </label>
          <label>
            Endereço
            <input
              value={newProperty.address}
              onChange={event => setNewProperty({ ...newProperty, address: event.target.value })}
            />
          </label>
          <label>
            Aluguel mensal
            <input
              type="number"
              value={newProperty.rent}
              onChange={event => setNewProperty({ ...newProperty, rent: Number(event.target.value) })}
            />
          </label>
          <label>
            Proprietário
            <input
              value={newProperty.owner}
              onChange={event => setNewProperty({ ...newProperty, owner: event.target.value })}
            />
          </label>
          <label>
            Inquilino
            <input
              value={newProperty.tenant}
              onChange={event => setNewProperty({ ...newProperty, tenant: event.target.value })}
            />
          </label>
          <label>
            Fim do contrato
            <input
              type="date"
              value={newProperty.leaseEnd}
              onChange={event => setNewProperty({ ...newProperty, leaseEnd: event.target.value })}
            />
          </label>
          <label>
            Próximo pagamento
            <input
              type="date"
              value={newProperty.nextPaymentDue}
              onChange={event => setNewProperty({ ...newProperty, nextPaymentDue: event.target.value })}
            />
          </label>
        </div>
        <button
          className="submit-button"
          type="button"
          onClick={() => {
            const nextId = Math.max(...properties.map(p => p.id)) + 1;
            const newItem: Property = {
              id: nextId,
              title: newProperty.title || 'Novo imóvel alugado',
              address: newProperty.address,
              rent: newProperty.rent || 0,
              status: 'Alugado',
              owner: newProperty.owner || 'Proprietário não informado',
              tenant: newProperty.tenant || 'Inquilino não informado',
              leaseEnd: newProperty.leaseEnd || 'não definido',
              nextPaymentDue: newProperty.nextPaymentDue || 'não definido',
              bedrooms: 2,
              bathrooms: 1
            };
            setProperties([newItem, ...properties]);
            setSelected(newItem);
            setNewProperty({
              title: '',
              address: '',
              rent: 0,
              owner: '',
              tenant: '',
              leaseEnd: '',
              nextPaymentDue: ''
            });
          }}
        >
          Adicionar imóvel
        </button>
      </section>

      <main>
        <article className="list-panel">
          <h2>Imóveis</h2>
          <div className="property-list">
            {filtered.map(property => (
              <button
                key={property.id}
                type="button"
                className={`property-card ${selected?.id === property.id ? 'active' : ''}`}
                onClick={() => setSelected(property)}
              >
                <div className="property-header">
                  <strong>{property.title}</strong>
                  <span className={statusClasses[property.status]}>{property.status}</span>
                </div>
                <p>{property.address}</p>
                <p>{property.bedrooms} quartos • {property.bathrooms} banheiros</p>
                <p>R$ {property.rent.toLocaleString('pt-BR')} / mês</p>
              </button>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <h2>Detalhes do imóvel</h2>
          {selected ? (
            <div className="details">
              <p><strong>Título:</strong> {selected.title}</p>
              <p><strong>Endereço:</strong> {selected.address}</p>
              <p><strong>Proprietário:</strong> {selected.owner}</p>
              {selected.tenant && <p><strong>Inquilino:</strong> {selected.tenant}</p>}
              <p><strong>Aluguel mensal:</strong> R$ {selected.rent.toLocaleString('pt-BR')}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              {selected.nextPaymentDue && <p><strong>Próximo pagamento:</strong> {selected.nextPaymentDue}</p>}
              {selected.leaseEnd && <p><strong>Fim do contrato:</strong> {selected.leaseEnd}</p>}
              <p><strong>Quartos:</strong> {selected.bedrooms}</p>
              <p><strong>Banheiros:</strong> {selected.bathrooms}</p>
            </div>
          ) : (
            <p>Selecione um imóvel para ver os detalhes.</p>
          )}
        </article>
      </main>
    </div>
  );
}

export default App;

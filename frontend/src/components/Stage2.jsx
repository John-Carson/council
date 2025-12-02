import { useState } from 'react';
import './Stage2.css';

export default function Stage2({ rankings, labelToModel, aggregateRankings }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!rankings || rankings.length === 0) {
    return null;
  }

  const getModelShortName = (model) => model.split('/')[1] || model;

  const getLabelModelName = (label) => {
    if (labelToModel && labelToModel[label]) {
      return getModelShortName(labelToModel[label]);
    }
    return label;
  };

  return (
    <div className="stage stage2">
      <h3 className="stage-title">Stage 2: Peer Rankings</h3>

      <div className="tabs">
        {rankings.map((rank, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {getModelShortName(rank.model)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <div className="ranking-model">
          {rankings[activeTab].model}
        </div>
        {rankings[activeTab].parsed_ranking &&
         rankings[activeTab].parsed_ranking.length > 0 ? (
          <ol className="model-ranking-list">
            {rankings[activeTab].parsed_ranking.map((label, i) => (
              <li key={i}>{getLabelModelName(label)}</li>
            ))}
          </ol>
        ) : (
          <p className="no-ranking">No ranking extracted</p>
        )}
      </div>

      {aggregateRankings && aggregateRankings.length > 0 && (
        <div className="aggregate-rankings">
          <h4>Aggregate Rankings</h4>
          <p className="stage-description">
            Combined results across all peer evaluations (lower score is better):
          </p>
          <div className="aggregate-list">
            {aggregateRankings.map((agg, index) => (
              <div key={index} className="aggregate-item">
                <span className="rank-position">#{index + 1}</span>
                <span className="rank-model">
                  {getModelShortName(agg.model)}
                </span>
                <span className="rank-score">
                  Avg: {agg.average_rank.toFixed(2)}
                </span>
                <span className="rank-count">
                  ({agg.rankings_count} votes)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';

export default function Menu({ displayed }: { displayed: boolean }) {
  return (
    <div className="menu" style={{ display: displayed ? 'block' : 'none' }}>
      <div className="menu-content centered">
        <button className="menu-button back-to-game-btn">
          <div className="menu-button-title">Back to Game</div>
        </button>
        <button className="menu-button">
          <div className="menu-button-title">Options</div>
        </button>
        <button className="menu-button">
          <div className="menu-button-title">Save and Quit</div>
        </button>
      </div>
    </div>
  );
}

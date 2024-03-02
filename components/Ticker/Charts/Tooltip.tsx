export const Tooltip = ({ show, position, content }) => {
    if (!show) {
      return null;
    }
  
    const style: React.CSSProperties = { // Explicitly type the style object
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      backgroundColor: 'rgba(11, 40, 65, 0.75)',
      color: 'white',
      padding: '5px',
      borderRadius: '5px',
      pointerEvents: 'none', // Correctly typed as 'none'
    };
  
    return (
      <div style={style}>
        {content}
      </div>
    );
  };
  
interface Props{
  active: boolean
}
export default function LightBulb({active}: Props) {
  return (
    <div className={`light-bulb ${active ? 'active' : ''}`}>
      <div className="bulb">
        <div className="filament"></div>
      </div>
      <div className="base"></div>
    </div>
  );
}

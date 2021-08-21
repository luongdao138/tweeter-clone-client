import { useEffect, useRef } from 'react';

const useEventListener = (
  eventType = '',
  target = window,
  listener = () => null,
  options
) => {
  const savedListener = useRef(null);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    if (!target?.addEventListener) return;
    const eventListener = (e) => savedListener?.current(e);
    target.addEventListener(eventType, eventListener, options);
    return () => target.removeEventListener(eventType, eventListener, options);
  }, [eventType, target, options]);
};

export default useEventListener;

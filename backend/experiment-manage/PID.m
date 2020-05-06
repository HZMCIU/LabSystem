function [y,t]=PID()
    Gs=tf(2,conv([3,1],[2,1]));
    sys=feedback(10*Gs,1);
    [y,t]=step(sys);
    y=roundn(y,-3);
    t=roundn(t,-3);
end

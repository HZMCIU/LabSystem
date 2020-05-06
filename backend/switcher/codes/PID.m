function [y,t]=PID 
 Gs=tf(2,conv([3,1],[2,1]));
 sys = feedback(16*Gs,1);
 [y,t]=step(sys);
end
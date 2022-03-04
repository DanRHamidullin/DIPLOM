#!/usr/bin/env python
# coding: utf-8

# In[19]:


import math

def main():
    C_ = float(input("P = "))
    q = int(input("q = "))
    E = int(input("E = "))
    W = int(input("W = "))
    D = int(input("D = "))
    K = int(input("C = "))
    t = int(input("t = "))
    s_ = int(input("S = "))
    A = int(input("A = "))
    
    listL=[]
    
    v = D * 1000 / W # тонны в ящики
    T = 1 # 1 месяц
    t = t/30
    print()
    print("Без скидки при оплате склада по потребностям: ")
    s1 = s_ * 30 / 1000 # дни в месяц и руб в тыс.руб
    Q_opt1 = math.ceil((2*K*v/s1)**(0.5))
    L_min1 = K*v*T/Q_opt1 +s1*T*Q_opt1/2 + C_*v*T
    n_opt1 = v*T/Q_opt1
    w_opt1 = v/Q_opt1
    t_opt1 = Q_opt1/v
    q_zak1 = t*v
    listL.append(L_min1)
    print(f' Размер заказа Qопт = {Q_opt1} ящика(-ов)')
    print(f' Общие затраты на управление запасами в месяц Lmin = {L_min1} тыс.руб.')
    print(f' nопт = {n_opt1} поставок за все время')
    print(f' wопт = {w_opt1} поставок за месяц')
    print(f' tопт = {t_opt1} месяцев между поставками')
    print(f' Точка заказа qзак = {q_zak1} ящиков на складе')
    
    print()
    print("Со скидкой при оплате склада по потребностям: ")
    s2 = s_ * 30 / 1000 # дни в месяц и руб в тыс.руб
    C2 = C_*(100-E)/100 # цена со скидкой
    Q_opt2 = q
    L_min2 = K*v*T/Q_opt2 +s2*T*Q_opt2/2 + C2*v*T
    n_opt2 = v*T/Q_opt2
    w_opt2 =v/Q_opt2
    t_opt2 = Q_opt2/v
    q_zak2 = t*v
    listL.append(L_min2)
    print(f' Размер заказа Qопт = {Q_opt2} ящика(-ов)')
    print(f' Общие затраты на управление запасами в месяц Lmin = {L_min2} тыс.руб.')
    print(f' nопт = {n_opt2} поставок за все время')
    print(f' wопт = {w_opt2} поставок за месяц')
    print(f' tопт = {t_opt2} месяцев между поставками')
    print(f' Точка заказа qзак = {q_zak2} ящиков на складе')
    
    print()
    print("Без скидки при постоянной аренде склада: ")
    s3=A/45/10 #стоимость аренды для одного ящика за месяц
    Q_opt3 = math.ceil((2*K*v/s3)**(0.5))
    L_min3 = K*v*T/Q_opt3 +s3*T*Q_opt3/2 + C_*v*T
    n_opt3 = v*T/Q_opt3
    w_opt3= v/Q_opt3
    t_opt3 = Q_opt3/v
    q_zak3 = t*v
    listL.append(L_min3)
    print(f' Размер заказа Qопт = {Q_opt3} ящика(-ов)')
    print(f' Общие затраты на управление запасами в месяц Lmin = {L_min3} тыс.руб.')
    print(f' nопт = {n_opt3} поставок за все время')
    print(f' wопт = {w_opt3} поставок за месяц')
    print(f' tопт = {t_opt3} месяцев между поставками')
    print(f' Точка заказа qзак = {q_zak3} ящиков на складе')
 
    print()
    print("Со скидкой при постоянной аренде склада: ")
    s4=A/45/10 #стоимость аренды для одного ящика за месяц
    C4 = C_*(100-E)/100 # цена со скидкой
    Q_opt4 = q
    L_min4 = K*v*T/Q_opt4 +s4*T*Q_opt4/2 + C4*v*T
    n_opt4 = v*T/Q_opt4
    w_opt4=v/Q_opt4
    t_opt4 = Q_opt4/v
    q_zak4=t*v
    listL.append(L_min4)
    print(f' Размер заказа Qопт = {Q_opt4} ящика(-ов)')
    print(f' Общие затраты на управление запасами в месяц Lmin = {L_min4} тыс.руб.')
    print(f' nопт = {n_opt4} поставок за все время')
    print(f' wопт = {w_opt4} поставок за месяц')
    print(f' tопт = {t_opt4} месяцев между поставками')
    print(f' Точка заказа qзак = {q_zak4} ящиков на складе')

    # пронумеруем список 
    listL_num = list(enumerate(listL, 0))
    # найдем минимум (из второго значения кортежей)
    l_min = min(listL_num, key=lambda i : i[1])
    # индекс минимального значения списка
    i = l_min[0] + 1
    
    print()
    print(f' Управленческое решение: при имеющейся системе скидок выгодно пользоваться вариантом {i}.')
    
    
if __name__ == "__main__":
    main()


# In[ ]:





# In[ ]:





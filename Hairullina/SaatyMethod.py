#!/usr/bin/env python
# coding: utf-8

# In[18]:


import numpy as np

#функция для определения средних значений по строкам
def averageValue(matrix):
    avg = np.zeros(len(matrix)) #Функция zeros() возвращает новый массив указанной формы и типа, заполненный нулями.
    #нормировка матрицы
    for i in range(0, len(matrix)):
        column = matrix[:, i] #столбец матрицы
        temp = column / column.sum() # делим все элементы матрицы на сумму элементов соответствующего столбца
        #определение средних значений по строкам (критериям)
        for j in range(0, len(matrix)):
            avg[j] += temp[j] 
    avg = avg / len(matrix)
    return avg

#функция для создания и заполнения матриц с количественными баллами сравнения критериев/альтернатив
def matrix(number):
    M = np.ones([number, number]) #Функция ones() возвращает новый массив указанной формы и типа, заполненный единицами.
    #заполняем матрицу
    for i in range(0, number):
        for j in range(0, number):
            if i < j:
                #запрашиваем ввод баллов 
                m = str(input(f'Оцените от 1 до 9 на сколько критерий/альтернатива {i+1} соответствует цели в сравнении с критерием/альтернативой {j+1}: '))
                M[i,j] = float(m)
                M[j, i] = 1 / float(m) #под главной диагональю записываются числа, обратные к соответствующим числам над диагональю          
    return M

def main():
    
    criteria = str(input("Введите количество критериев: ")) #запрашиваем количество критериев
    print()
    M = matrix(int(criteria))#строим матрицу для качественного сравнения критериев
    print()
    print(M) # выводим матрицу
    print()
    points = averageValue(M) # определение средних значений по строкам
    for i in range(len(points)): # промежуточные выводы
        print(f'Критерий {i} = {np.round(points[i], 3)}')  # округляем результаты до трех знаков после запятой

    alternatives = str(input("Введите количество альтернатив: "))
    allPointsMatrix = np.zeros([int(alternatives),int(criteria)]) #матрица весов альтернатив по всем критериям
    print()
    for i in range(0, int(criteria)):
        print()
        print(f'Количественные баллы сравнения весов по критерию {i+1}' ) #весовой столбец альтернатив 
        M = matrix(int(alternatives)) # строим матрицу для качественного сравнения альтернатив
        print(M)
        allPointsMatrix[:, i] = averageValue(M) # заполняем матрицу весов альтернатив по столбцам средними значениями по строкам
    print()
    print("Матрица весов альтернатив по всем критериям: ")
    print(allPointsMatrix)
   
    #Умножаем полученную матрицу на столбец весов критериев по цели матрично
    #В результате получаем веса альтернатив с точки зрения достижения поставленной цели.
    result = np.matmul(allPointsMatrix, points) #Функция matmul() вычисляет матричное произведение двух массивов.
    print()
    print(result)
    print()
    for i in range(len(result)):
            print(f'Альтернатива {i} соотвествует на {np.round(result[i], 3)*100} %') # округляем результаты до трех знаков после запятой


if __name__ == "__main__":
    main()


# In[ ]:





# In[ ]:





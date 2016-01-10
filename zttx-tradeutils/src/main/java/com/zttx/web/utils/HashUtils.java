/*
 * @(#)HashUtils.java 2014-3-5 下午6:47:45
 * Copyright 2014 刘志坚, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.utils;

/**
 * <p>File：HashUtils.java</p>
 * <p>Title: Hash算法处理工具类</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2014 2014-3-5 下午6:47:45</p>
 * <p>Company: 8637.com</p>
 * @author 刘志坚
 * @version 1.0
 */
public class HashUtils
{
    // 私有构造器
    private HashUtils()
    {
        super();
    }
    
    /**
     * 加法HASH，加法Hash就是把输入元素一个一个的加起来构成最后的结果
     * @param key 字符串
     * @param prime 一个质数
     * @return int hash结果
     */
    public static int additiveHash(String key, int prime)
    {
        int hash, i;
        for (hash = key.length(), i = 0; i < key.length(); i++)
            hash += key.charAt(i);
        return (hash % prime);
    }
    
    /**
     * 旋转HASH
     * @param key 字符串
     * @param prime 一个质数
     * @return int hash结果
     */
    public static int rotatingHash(String key, int prime)
    {
        int hash, i;
        for (hash = key.length(), i = 0; i < key.length(); ++i)
            hash = (hash << 4) ^ (hash >> 28) ^ key.charAt(i);
        return (hash % prime);
    }
    
    /**
     * 一次一个hash
     * @param key 输入字符串
     * @return 输出hash值
     */
    public static int oneByOneHash(String key)
    {
        int hash, i;
        for (hash = 0, i = 0; i < key.length(); ++i)
        {
            hash += key.charAt(i);
            hash += (hash << 10);
            hash ^= (hash >> 6);
        }
        hash += (hash << 3);
        hash ^= (hash >> 11);
        hash += (hash << 15);
        return hash;
    }
    
    /**
     * Bernstein's hash
     * @param key 输入字节数组
     * @param level 初始hash常量
     * @return 结果hash
     */
    public static int bernstein(String key)
    {
        int hash = 0;
        int i;
        for (i = 0; i < key.length(); ++i)
            hash = 33 * hash + key.charAt(i);
        return hash;
    }
    
    /**
     * Universal Hashing
     * @param key char[]
     * @param mask int
     * @param tab int[]
     * @return int hash值
     */
    public static int universal(char[] key, int mask, int[] tab)
    {
        int hash = key.length, i, len = key.length;
        for (i = 0; i < (len << 3); i += 8)
        {
            char k = key[i >> 3];
            if ((k & 0x01) == 0) hash ^= tab[i + 0];
            if ((k & 0x02) == 0) hash ^= tab[i + 1];
            if ((k & 0x04) == 0) hash ^= tab[i + 2];
            if ((k & 0x08) == 0) hash ^= tab[i + 3];
            if ((k & 0x10) == 0) hash ^= tab[i + 4];
            if ((k & 0x20) == 0) hash ^= tab[i + 5];
            if ((k & 0x40) == 0) hash ^= tab[i + 6];
            if ((k & 0x80) == 0) hash ^= tab[i + 7];
        }
        return (hash & mask);
    }
    
    /**
     * Zobrist Hashing
     * @param key char[]
     * @param mask int
     * @param tab int[][]
     * @return int hash值
     */
    public static int zobrist(char[] key, int mask, int[][] tab)
    {
        int hash, i;
        for (hash = key.length, i = 0; i < key.length; ++i)
            hash ^= tab[i][key[i]];
        return (hash & mask);
    }
    
    /**
     * 32位的FNV算法
     * @param data 数组
     * @return int值
     */
    public static int FNVHash(byte[] data)
    {
        int M_SHIFT = 0;
        int mask = 3;// 随意定义一个质数
        int hash = (int) 2166136261L;
        for (byte b : data)
            hash = (hash * 16777619) ^ b;
        if (M_SHIFT == 0) return hash;
        return (hash ^ (hash >> M_SHIFT)) & mask;
    }
    
    /**
     * 改进的32位FNV算法1
     * @param data 数组
     * @return int值
     */
    public static int FNVHash1(byte[] data)
    {
        final int p = 16777619;
        int hash = (int) 2166136261L;
        for (byte b : data)
            hash = (hash ^ b) * p;
        hash += hash << 13;
        hash ^= hash >> 7;
        hash += hash << 3;
        hash ^= hash >> 17;
        hash += hash << 5;
        return hash;
    }
    
    /**
     * 改进的32位FNV算法1
     * @param data 字符串
     * @return int值
     */
    public static int FNVHash1(String data)
    {
        final int p = 16777619;
        int hash = (int) 2166136261L;
        for (int i = 0; i < data.length(); i++)
            hash = (hash ^ data.charAt(i)) * p;
        hash += hash << 13;
        hash ^= hash >> 7;
        hash += hash << 3;
        hash ^= hash >> 17;
        hash += hash << 5;
        return hash;
    }
    
    /**
     * Thomas Wang的算法，整数hash
     * @param key int 
     * @return int hash值
     */
    public static int intHash(int key)
    {
        key += ~(key << 15);
        key ^= (key >>> 10);
        key += (key << 3);
        key ^= (key >>> 6);
        key += ~(key << 11);
        key ^= (key >>> 16);
        return key;
    }
    
    /**
     * RS算法hash
     * @param str 字符串
     */
    public static int RSHash(String str)
    {
        int b = 378551;
        int a = 63689;
        int hash = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash = hash * a + str.charAt(i);
            a = a * b;
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * JS算法
     * @param str 字符串
     * @return int hash值
     */
    public static int JSHash(String str)
    {
        int hash = 1315423911;
        for (int i = 0; i < str.length(); i++)
        {
            hash ^= ((hash << 5) + str.charAt(i) + (hash >> 2));
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * PJW算法
     * @param str 字符串
     * @return int hash值
     */
    public static int PJWHash(String str)
    {
        int BitsInUnsignedInt = 32;
        int ThreeQuarters = (BitsInUnsignedInt * 3) / 4;
        int OneEighth = BitsInUnsignedInt / 8;
        int HighBits = 0xFFFFFFFF << (BitsInUnsignedInt - OneEighth);
        int hash = 0;
        int test = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash = (hash << OneEighth) + str.charAt(i);
            if ((test = hash & HighBits) != 0)
            {
                hash = ((hash ^ (test >> ThreeQuarters)) & (~HighBits));
            }
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * ELF算法
     * @param str 字符串
     * @return int hash值
     */
    public static int ELFHash(String str)
    {
        int hash = 0;
        int x = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash = (hash << 4) + str.charAt(i);
            if ((x = (int) (hash & 0xF0000000L)) != 0)
            {
                hash ^= (x >> 24);
                hash &= ~x;
            }
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * BKDR算法
     * @param str 字符串
     * @return int hash值
     */
    public static int BKDRHash(String str)
    {
        int seed = 131; // 31 131 1313 13131 131313 etc..
        int hash = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash = (hash * seed) + str.charAt(i);
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * SDBM算法
     * @param str 字符串
     * @return int hash值
     */
    public static int SDBMHash(String str)
    {
        int hash = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash = str.charAt(i) + (hash << 6) + (hash << 16) - hash;
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * DJB算法
     * @param str 字符串
     * @return int hash值
     */
    public static int DJBHash(String str)
    {
        int hash = 5381;
        for (int i = 0; i < str.length(); i++)
        {
            hash = ((hash << 5) + hash) + str.charAt(i);
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * DEK Hash算法
     * @param str 字符串
     * @return int HASH值
     */
    public static int DEKHash(String str)
    {
        int hash = str.length();
        for (int i = 0; i < str.length(); i++)
        {
            hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i);
        }
        return (hash & 0x7FFFFFFF);
    }
    
    /**
     * AP算法
     * @param str 字符串
     * @return int hash结果
     */
    public static int APHash(String str)
    {
        int hash = 0;
        for (int i = 0; i < str.length(); i++)
        {
            hash ^= ((i & 1) == 0) ? ((hash << 7) ^ str.charAt(i) ^ (hash >> 3)) : (~((hash << 11) ^ str.charAt(i) ^ (hash >> 5)));
        }
        return hash;
    }
    
    /**
     * java自带的HASH算法
     * @param str 字符串
     * @return int hash结果
     */
    public static int java(String str)
    {
        int h = 0;
        int off = 0;
        int len = str.length();
        for (int i = 0; i < len; i++)
        {
            h = 31 * h + str.charAt(off++);
        }
        return h;
    }
    
    /**
     * 混合hash算法，输出64位的值
     * @param str 字符串
     * @return long hash结果
     */
    public static long mixHash(String str)
    {
        long hash = str.hashCode();
        hash <<= 32;
        hash |= FNVHash1(str);
        return hash;
    }
}
